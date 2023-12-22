import { Expose } from 'class-transformer';
import { IsBoolean, IsDefined, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Default } from '../../../utils/defaultDecorator/default';

export const loggerPrettyPrintOptions = {
  levelFirst: true,
  translateTime: true,
  ignore: 'pid,hostname',
};

export const defaultMongooseConnectOptions = {
  autoIndex: true,
};

export enum NodeEnv {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test',
  PROVISION = 'provision',
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

// Важно, в каждой проперти указывать Expose это необходимо для корректной работы декоратора Default
// Если не указать, дефолты не проставятся
export class Configuration {
  @Expose()
  @IsEnum(NodeEnv, {
    message: '$property = $value must be valid Enum value',
  })
  @Default(NodeEnv.PRODUCTION)
  nodeEnv: NodeEnv;

  @Expose()
  @IsNumber()
  @Default(3005)
  port: number;

  @Expose()
  @IsString()
  @IsDefined({
    message: '$property required in configuration',
  })
  mongoUrl: string;

  @Expose()
  @IsString()
  @IsOptional()
  appFqdn: string | undefined;

  @Expose()
  @IsString()
  @Default('localhost')
  hostname: string;

  @Expose()
  @IsString()
  @Default('wishlist')
  mongoDbName: string;

  @Expose()
  @IsString()
  @IsOptional()
  mongoRsName: string | undefined;

  @Expose()
  @IsString()
  @Default('wishlist_file')
  mongoDbFilesName: string;

  @Expose()
  @IsString()
  @IsOptional()
  mongoUser: string | undefined;

  @Expose()
  @IsString()
  @IsOptional()
  mongoPassword: string | undefined;

  @Expose()
  @IsString()
  @IsOptional()
  appGlobalPrefix: string | undefined;

  @Expose()
  @IsBoolean()
  @Default(false)
  swaggerWriteJson: boolean;

  @Expose()
  @IsEnum(LogLevel)
  @Default(LogLevel.INFO)
  logLevel: LogLevel;

  @Expose()
  @IsBoolean()
  @Default(false)
  rateLimitEnable: boolean;

  @Expose()
  @IsNumber()
  @Default(15)
  rateLimitTimeMinutes: number;

  @Expose()
  @IsNumber()
  @Default(50)
  rateLimitMax: number;

  @Expose()
  @IsBoolean()
  @Default(false)
  helmetEnabled: boolean;

  @Expose()
  @IsString()
  @Default('34ba27b4dae947c5960add850a84e13c')
  jwtSecret: string;

  @Expose()
  @IsString()
  @Default('7d')
  jwtExpiresIn: string;

  @Expose()
  @IsNumber()
  @Default(10)
  passwordHashLength: number;

  @Expose()
  @IsString()
  @Default('100mb')
  maxBodySize: string;

  @Expose()
  @IsBoolean()
  @Default(false)
  compressionEnabled: boolean;

  @Expose()
  @IsBoolean()
  @Default(false)
  swaggerJsonWriteFile: boolean;

  @Expose()
  @IsBoolean()
  @Default(true)
  swaggerEnabled: boolean;

  @Expose()
  getMongooseUrl() {
    return `mongodb://${this.mongoUrl}/${this.mongoDbName}`;
  }

  @Expose()
  isMongoAuthEnable() {
    return this.mongoPassword != undefined && this.mongoUser != undefined;
  }

  @Expose()
  getMongooseOptions() {
    return defaultMongooseConnectOptions;
  }

  @Expose()
  isMongoReplicaSetEnable() {
    return this.mongoRsName != undefined;
  }

  @Expose()
  getLoggerPrettyPrintOptions() {
    return loggerPrettyPrintOptions;
  }

  @Expose()
  isProduction() {
    return this.nodeEnv === NodeEnv.PRODUCTION;
  }

  @Expose()
  getAppUrl() {
    return this.appFqdn === undefined
      ? `http://${this.hostname}:${this.port}${this.appGlobalPrefix}`
      : `${this.appFqdn}${this.appGlobalPrefix}`;
  }
}
