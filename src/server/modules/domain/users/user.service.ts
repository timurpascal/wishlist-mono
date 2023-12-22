import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { GiftGetDto } from '../gifts/dto/gift.get.dto';
import { BadRequestErrors } from './../../common/errors/badRequest.errors';
import { ConfigurationService } from './../../core/config/config.service';
import { UserCreateDto } from './dto/user.create.dto';
import { UserPrivateGetDto } from './dto/user.private.get.dto';
import { UserPublicGetDto } from './dto/user.public.get.dto';
import { UserUpdateDto } from './dto/user.update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel,
    @InjectModel('Gift') private readonly giftModel,
    @InjectModel('Subscriber') private readonly subscribeModel,
    private readonly config: ConfigurationService,
  ) {}

  async deleteOne(currentUserId: string): Promise<void> {
    await this.userModel.findOneAndDelete(currentUserId).exec();
  }

  async findOne(id: string): Promise<UserPublicGetDto> {
    const userFromDb = await this.userModel.findById(id).exec();
    if (userFromDb) {
      return new UserPublicGetDto(userFromDb);
    } else {
      throw new NotFoundException(BadRequestErrors.notFound(`User with id = ${id} not found`));
    }
  }

  async create(user: UserCreateDto): Promise<UserPrivateGetDto> {
    try {
      const passHash = await hash(user.password, this.config.passwordHashLength);
      user.passHash = passHash;
      const newUser = await this.userModel.create(user);
      return new UserPrivateGetDto(newUser);
    } catch (err) {
      if (err.code === 11000) {
        const keys = Object.keys(err.keyValue).join(',');
        throw new BadRequestException(BadRequestErrors.noUniqField(keys));
      }
    }
  }

  async findAll(): Promise<UserPublicGetDto[]> {
    const allUserFromDb = await this.userModel
      .find({
        deleted: false,
      })
      .exec();
    console.log('================');
    console.log(allUserFromDb);
    console.log('================');
    return allUserFromDb.map(i => new UserPublicGetDto(i));
  }

  async updateOne(id: string, body: UserUpdateDto): Promise<UserPrivateGetDto> {
    if (body.email) {
      throw new BadRequestException(BadRequestErrors.badRequest('Email change not implement yet'));
    }
    if (body.password) {
      const passHash = await hash(body.password, this.config.passwordHashLength);
      body.passHash = passHash;
    }
    const userFromDb = await this.userModel
      .findByIdAndUpdate(id, body, {
        new: true,
        omitUndefined: true,
      })
      .exec();
    return new UserPrivateGetDto(userFromDb);
  }

  async findAllGiftByUserId(userId: string): Promise<GiftGetDto[]> {
    const user = await this.userModel.findById(userId).exec();
    if (user) {
      const allGiftByUserId = await this.giftModel
        .find({
          ownerId: userId,
          deleted: false,
        })
        .exec();
      return allGiftByUserId.map(i => {
        const double = this.TransformPhotoLink(i);
        return new GiftGetDto(double);
      });
    } else {
      throw new NotFoundException(BadRequestErrors.notFound(`User with id = ${userId} not found`));
    }
  }

  private TransformPhotoLink(gift: any) {
    const double = gift.toObject();
    double.id = double._id.toString();
    double.mainPhoto = double?.mainPhoto
      ? `${this.config.getAppUrl()}/files/${double.mainPhoto.toString()}`
      : undefined;
    double.photos = double?.photos?.length
      ? double.photos.map(i => `${this.config.getAppUrl()}/files/${i}`)
      : undefined;
    return double;
  }

  async getSubscribersByUserId(userId: string): Promise<UserPublicGetDto[]> {
    const subscribersList = await this.subscribeModel
      .find({
        sourceId: userId,
      })
      .populate('destinationId')
      .exec();
    return subscribersList.map(i => new UserPublicGetDto(i.toJSON().destinationId));
  }
}
