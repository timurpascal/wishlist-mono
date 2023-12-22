import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ConfigurationModule } from './../config/config.module';
import { LoggerProvider } from './logger.provider';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigurationModule],
      providers: [LoggerProvider],
      inject: [LoggerProvider],
      useFactory: (logger: LoggerProvider) => {
        return logger.getLogger();
      },
    }),
  ],
})
export class LoggerModule {}
