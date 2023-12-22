import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GiftSchema } from '../gifts/dbo/gift.dbo';
import { ConfigurationModule } from './../../core/config/config.module';
import { SubscriberSchema } from '../subscribers/dbo/subscribers.dbo';
import { UserSchema } from './dbo/user.dbo';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigurationModule,
    MongooseModule.forFeature([{ name: 'Gift', schema: GiftSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Subscriber', schema: SubscriberSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
