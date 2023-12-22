import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationModule } from '../../core/config/config.module';
import { GiftSchema } from './dbo/gift.dbo';
import { GiftController } from './gift.controller';
import { GiftService } from './gift.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Gift', schema: GiftSchema }]), ConfigurationModule],
  controllers: [GiftController],
  providers: [GiftService],
})
export class GiftModule {}
