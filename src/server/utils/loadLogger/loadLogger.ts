/* eslint-disable no-process-env */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService, LogLevel } from '@nestjs/common';
import { config } from 'dotenv';
import * as pino from 'pino';
import { loggerPrettyPrintOptions, NodeEnv } from '../../modules/core/config/config';

export const tempLogger = (): TempLogger => {
  const isTesting = process.env.NODE_ENV === NodeEnv.TEST;
  const isProduction = process.env.NODE_ENV === NodeEnv.PRODUCTION;
  config({ path: isTesting ? '.env.test' : '.env' });
  const pinoLogger = pino({
    prettyPrint: isProduction ? false : loggerPrettyPrintOptions,
  });
  return new TempLogger(pinoLogger);
};

export class TempLogger implements LoggerService {
  private readonly logger: pino.Logger;
  constructor(logger: pino.Logger) {
    this.logger = logger;
  }
  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message);
  }
  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message);
  }
  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }
  setLogLevels?(levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}
