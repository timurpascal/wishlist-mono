/* eslint-disable no-process-env */
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { config } from 'dotenv';
import * as dotenvParseVariables from 'dotenv-parse-variables';
import { convertEnvToCarmelCase } from '../../../utils/envToConfig/main';
import { Configuration } from './config';

class ConfigurationValidationError extends Error {
  valueName: string;
  constructor({ valueName, message }) {
    super(message);
    this.valueName = valueName;
  }
}

@Injectable()
export class ConfigurationService extends Configuration {
  constructor() {
    super();
    const dotEnvFilePath = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
    // Загрузили все из dotenv файла в process.env
    config({ path: dotEnvFilePath });
    // Теперь распарсили все из process.env в объект, это позволяет не завязываться на .env
    const parsedAllProcessEnv = dotenvParseVariables(process.env);

    // Создаем объект для внутрреней конфигурации, и переименовываем все проперти в carmelCase
    const dotEnvVariablesWithCarmelCase = {};
    Object.keys(parsedAllProcessEnv).map(env => {
      dotEnvVariablesWithCarmelCase[convertEnvToCarmelCase(env)] = parsedAllProcessEnv[env];
    });

    // Сериализируем, оставляя лишь то, что указано в классе Configuration
    const parsedConfigClass = plainToClass(Configuration, dotEnvVariablesWithCarmelCase, {
      excludeExtraneousValues: true,
    });
    // Валидируем конфигурацию
    validate(parsedConfigClass)
      .then(config => {
        if (config.length !== 0) {
          const error = config[0];
          const key = Object.keys(error.constraints)[0];
          throw new ConfigurationValidationError({
            valueName: error.property,
            message: error.constraints[key],
          });
        }
      })
      .catch(err => {
        throw err;
      });

    // Сетим все проперти конфигов на самого себя
    Object.keys(parsedConfigClass).map(config => {
      this[config] = parsedConfigClass[config];
    });
  }
}
