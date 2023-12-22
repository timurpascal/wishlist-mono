import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { PinoLogger } from 'nestjs-pino';
import { ConfigurationService } from '../config/config.service';

@Injectable()
export class MongoConfigConnect implements MongooseOptionsFactory {
  constructor(private readonly logger: PinoLogger, private readonly config: ConfigurationService) {
    this.logger.setContext('DatabaseRootProvider');
  }
  createMongooseOptions(): MongooseModuleOptions {
    const opts = this.config.getMongooseOptions();
    if (this.config.isMongoReplicaSetEnable()) {
      const uri = `mongodb://${this.config.mongoUser}:${this.config.mongoPassword}@${this.config.mongoUrl}/${this.config.mongoDbName}?replicaSet=${this.config.mongoRsName}`;
      this.logger.warn('Success connect to real database with auth and replicaSet from config');
      return { uri, ...opts };
    } else if (this.config.isMongoAuthEnable()) {
      const uri = `mongodb://${this.config.mongoUser}:${this.config.mongoPassword}@${this.config.mongoUrl}/${this.config.mongoDbName}`;
      this.logger.warn('Success connect to real database with auth from config');
      return { uri, ...opts };
    } else {
      const uri = `mongodb://${this.config.mongoUrl}/${this.config.mongoDbName}`;
      this.logger.warn(`Success connect to real database without auth to ${uri}`);
      return { uri, ...opts };
    }
  }
}
