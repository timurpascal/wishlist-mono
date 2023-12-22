import { Params } from 'nestjs-pino';

export interface ILoggerProvider {
  getLogger(): Params;
}
