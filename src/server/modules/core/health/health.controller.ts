import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { KubeHealth } from './dto/kubeHealth.dto';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiResponse({
    description: 'App healthcheck for kubernetes',
  })
  getHello(): KubeHealth {
    return this.healthService.kubeHealth();
  }
}
