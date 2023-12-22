import { Module } from '@nestjs/common';
import { GiftModule } from './gifts/gift.module';
import { SubscriberModule } from './subscribers/subscriber.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [GiftModule, UserModule, SubscriberModule],
  exports: [GiftModule, UserModule, SubscriberModule],
})
export class DomainModule {}
