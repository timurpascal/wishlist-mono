import { Injectable } from '@nestjs/common';
import { name, version } from '../../../../../package.json';
import { ConfigurationService } from '../config/config.service';
import { KubeHealth } from './dto/kubeHealth.dto';

@Injectable()
export class HealthService {
  constructor(private readonly config: ConfigurationService) {}

  kubeHealth(): KubeHealth {
    const appUrl = this.config.getAppUrl();

    return {
      status: 'ok',
      name,
      version,
      mode: this.config.nodeEnv,
      docs: `${appUrl}/swagger`,
      docsJson: `${appUrl}/swagger-json`,
    };
  }
}
