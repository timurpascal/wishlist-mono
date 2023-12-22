import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { FileModule } from './files/file.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule, FileModule, LoggerModule, ConfigurationModule, DatabaseModule, AuthModule],
  exports: [ConfigurationModule, DatabaseModule],
})
export class CoreModule {}
