import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtTokenDto } from '../../core/auth/dto/jwtToken.dto';
import { BadRequestErrors } from './../../common/errors/badRequest.errors';
import { UserPublicGetDto } from './../users/dto/user.public.get.dto';
import { SubscriberGetDto } from './dto/subscribers.get.dto';

@Injectable()
export class SubscriberService {
  constructor(@InjectModel('Subscriber') private readonly subscribeModel) {}

  async createSubscribe(user: JwtTokenDto, dstUserId: string): Promise<SubscriberGetDto> {
    try {
      const newSubsribe = await this.subscribeModel.create({
        sourceId: user.id,
        destinationId: dstUserId,
      });
      return new SubscriberGetDto(newSubsribe);
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException(BadRequestErrors.badRequest('Already subscribe'));
      }
    }
  }

  async deleteSubscribe(dstUserId: string): Promise<boolean> {
    const deletedSubscribe = await this.subscribeModel
      .deleteOne({
        destinationId: dstUserId,
      })
      .exec();
    if (deletedSubscribe) {
      return true;
    } else {
      throw new NotFoundException(BadRequestErrors.notFound(`Subscribe with id = ${dstUserId} not found`));
    }
  }

  async getSubscribersByUserId(userId: string): Promise<UserPublicGetDto[]> {
    const subscribersList = await this.subscribeModel
      .find({
        sourceId: userId,
      })
      .populate('destinationId')
      .exec();
    return subscribersList.map(i => new UserPublicGetDto(i.destinationId));
  }
}
