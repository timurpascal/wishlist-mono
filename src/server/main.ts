import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { json } from 'express';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { Logger, PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ConfigurationService } from './modules/core/config/config.service';
import { swaggerLoad } from './swagger';
import { tempLogger } from './utils/loadLogger/loadLogger';

async function bootstrap() {
  const loadLogger = tempLogger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: loadLogger,
    bufferLogs: false,
  });

  // Logger pino use
  app.useLogger(app.get(Logger));
  const logger = await app.resolve(PinoLogger);
  logger.setContext('Bootstrap');

  const reflector = app.get(Reflector);

  // Configure
  const configService = app.get(ConfigurationService);
  const nodeEnv = configService.nodeEnv;
  const rateLimitTimeMinutes = configService.rateLimitTimeMinutes;
  const rateLimitMax = configService.rateLimitMax;
  const maxBodySize = configService.maxBodySize;
  const appGlobalPrefix = configService.appGlobalPrefix;
  const swaggerJsonWriteFile = configService.swaggerJsonWriteFile;
  const appUrl = configService.getAppUrl();

  // Security
  if (configService.helmetEnabled) {
    logger.warn('Helmet enabled');
    app.use(helmet());
  } else {
    logger.warn('Helmet disabled');
  }

  // Prefix
  if (appGlobalPrefix) {
    logger.warn(`Set global prefix = ${appGlobalPrefix}`);
    app.setGlobalPrefix(appGlobalPrefix);
  }

  // Rate limit
  if (configService.rateLimitEnable) {
    app.use(
      rateLimit({
        windowMs: rateLimitTimeMinutes * 60 * 1000, // 15 minutes
        max: rateLimitMax, // limit each IP to rateLimitMax requests per windowMs
      }),
    );
    logger.warn(`App use RateLimit with ${rateLimitTimeMinutes} minutes, and ${rateLimitMax} max`);

    if (configService.isProduction()) {
      app.set('trust proxy', 1);
      logger.warn('App use trust proxy');
    }
  } else {
    logger.warn('RateLimit disabled');
  }

  // Data limiter
  logger.warn(`Body limit = ${maxBodySize}`);
  app.use(json({ limit: maxBodySize }));

  // Swagger
  if (configService.swaggerEnabled) {
    logger.warn('Swagger enabled');
    swaggerLoad(app, appGlobalPrefix, swaggerJsonWriteFile);
  } else {
    logger.warn('Swagger disabled');
  }

  // CORS
  if (nodeEnv === 'development') {
    app.enableCors();
    logger.warn('Cors allowed in development mode');
  } else {
    logger.warn(`Cors disabled in ${nodeEnv} mode`);
  }

  // Validation request data to Type in code
  // whitelist - only allowed data confirm in req object
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // https://stackoverflow.com/questions/59531427/why-should-we-not-use-enableimplicitconversion-when-using-class-transformer
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );

  // Compression
  if (configService.compressionEnabled) {
    logger.warn('Compression (gzip) enabled');
    app.use(compression());
  } else {
    logger.warn('Compression (gzip) disabled');
  }

  // Shutdown Hook
  app.enableShutdownHooks();

  // Transform request data to type with class-transformer
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // Start app
  await app.listen(configService.port, configService.hostname);

  logger.warn(`App run in ${nodeEnv} mode`);
  logger.warn(`Listening to ${appUrl}`);
  if (configService.swaggerEnabled) {
    logger.warn(`Swagger UI: ${appUrl}/swagger`);
  }
}
bootstrap();
