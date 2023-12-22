import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/config.module';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [ConfigurationModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
