import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { MongoConfigConnect } from './database.providers';

@Module({
  imports: [
    ConfigurationModule,
    MongooseModule.forRootAsync({
      imports: [LoggerModule, ConfigurationModule],
      useClass: MongoConfigConnect,
    }),
  ],
  providers: [MongoConfigConnect],
})
export class DatabaseModule {}
