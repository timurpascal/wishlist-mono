/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService, LogLevel } from '@nestjs/common';
import pino from 'pino';

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
