import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtTokenDto } from '../../core/auth/dto/jwtToken.dto';
import { ConfigurationService } from '../../core/config/config.service';
import { BadRequestErrors } from './../../common/errors/badRequest.errors';
import { GiftCreateDto } from './dto/gift.create.dto';
import { GiftGetDto } from './dto/gift.get.dto';
import { GiftUpdateDto } from './dto/gift.update.dto';

@Injectable()
export class GiftService {
  constructor(@InjectModel('Gift') private readonly giftModel, private readonly config: ConfigurationService) {}

  async findAll(user: any): Promise<GiftGetDto[]> {
    const allGift = await this.giftModel
      .find({
        ownerId: user.id,
        deleted: false,
      })
      .exec();
    return allGift.map(gift => {
      const double = this.TransformPhotoLink(gift);
      return new GiftGetDto(double);
    });
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

  async findOne(id: string): Promise<GiftGetDto> {
    const oneGift = await this.giftModel.findById(id).exec();
    if (oneGift) {
      const double = this.TransformPhotoLink(oneGift);
      return new GiftGetDto(double);
    } else {
      throw new NotFoundException(BadRequestErrors.notFound(`Gift with id = ${id} not found`));
    }
  }

  async findAllGiftByUserId(userId: string): Promise<GiftGetDto[]> {
    const allGiftByUser = await this.giftModel
      .find({
        ownerId: userId,
        deleted: false,
      })
      .exec();
    if (allGiftByUser) {
      return allGiftByUser.map(i => {
        const double = this.TransformPhotoLink(i);
        return new GiftGetDto(double);
      });
    } else {
      throw new NotFoundException(BadRequestErrors.notFound(`User with id = ${userId} not found`));
    }
  }

  async create(createDto: GiftCreateDto, user: JwtTokenDto): Promise<GiftGetDto> {
    createDto.ownerId = user.id;
    const newGift = await this.giftModel.create(createDto);
    const double = this.TransformPhotoLink(newGift);
    return new GiftGetDto(double);
  }

  async update(id: string, updateDto: GiftUpdateDto): Promise<GiftGetDto> {
    const updatedGift = await this.giftModel
      .findByIdAndUpdate(id, updateDto, {
        new: true,
        omitUndefined: true,
      })
      .exec();
    if (updatedGift) {
      const double = this.TransformPhotoLink(updatedGift);
      return new GiftGetDto(double);
    } else {
      throw new NotFoundException(BadRequestErrors.notFound(`Gift with id = ${id} not found`));
    }
  }

  async delete(user: JwtTokenDto, id: string): Promise<GiftGetDto> {
    const giftForDeleted = await this.giftModel.findById(id);
    if (giftForDeleted) {
      if (giftForDeleted.ownerId.toString() === user.id.toString()) {
        const deletedGift = await this.giftModel.findByIdAndRemove(id).exec();
        const double = this.TransformPhotoLink(deletedGift);
        return new GiftGetDto(double);
      } else {
        throw new ForbiddenException(
          BadRequestErrors.forbidden(`You don't have permission to change object with id = ${id}`),
        );
      }
    } else {
      throw new NotFoundException(BadRequestErrors.notFound(`Gift with id = ${id} not found`));
    }
  }
}
