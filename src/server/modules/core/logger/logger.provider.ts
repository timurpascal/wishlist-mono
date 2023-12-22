import { Injectable } from '@nestjs/common';
import { NodeEnv } from '../config/config';
import { ConfigurationService } from '../config/config.service';
import { ILoggerProvider } from './ILoggerProvider';

@Injectable()
export class LoggerProvider implements ILoggerProvider {
  constructor(private readonly config: ConfigurationService) {}

  getLogger() {
    if (this.config.nodeEnv === NodeEnv.PRODUCTION) {
      return {
        pinoHttp: {
          level: this.config.logLevel,
          redact: ['req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]'],
        },
      };
    } else {
      return {
        pinoHttp: {
          level: this.config.logLevel,
          // Логируем body
          serializers: {
            req(req) {
              req.body = req.raw.body;
              return req;
            },
          },
          // mixin: () => {
          //   return {
          //     qwe: 1,
          //   };
          // },
          prettyPrint: this.config.getLoggerPrettyPrintOptions(),
        },
      };
    }
  }
}
