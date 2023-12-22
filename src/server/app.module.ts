import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core/core.module';
import { DomainModule } from './modules/domain/domain.module';

@Module({
  imports: [DomainModule, CoreModule],
})
export class AppModule {}
