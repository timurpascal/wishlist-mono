import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { BaseDBObject } from './../../../common/baseDbObject';
import { giftValidator as valid } from './../validator/gift.validator';

export class Gift extends BaseDBObject {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    minLength: valid.name.minlength,
    maxLength: valid.name.maxlength,
    description: 'Name for your gift',
    example: 'Dji mavic air',
  })
  @Length(valid.name.minlength, valid.name.maxlength)
  name: string;

  @IsString()
  @Length(valid.reason.minlength, valid.reason.maxlength)
  @ApiProperty({
    minLength: valid.reason.minlength,
    maxLength: valid.reason.maxlength,
    description: 'reason for you want this gift',
    example: "I'm finally going to be a pilot!",
  })
  reason: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    // minLength: valid.tag.minlength,
    // maxLength: valid.tag.maxlength,
    example: ['tech'],
    isArray: true,
    description: 'Set category/tag for you gift',
  })
  tag?: string[];

  @IsString()
  @IsOptional()
  @Length(valid.tag.minlength, valid.tag.maxlength)
  @ApiProperty({
    minLength: valid.description.minlength,
    maxLength: valid.description.maxlength,
    example: 'Dji mavic pro - best drone for your video!',
    description: 'Say all world, what is your gift',
  })
  description?: string;

  @IsNumber()
  @Min(valid.price.min)
  @Max(valid.price.max)
  @ApiProperty({
    description: 'Price for your gift',
    minimum: valid.price.min,
    maximum: valid.price.max,
    example: 1500,
  })
  price: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: ['5f7c1ddbb7ff8d7f11d46061', '5f7c1ddbb7ff8d7f11236061'],
    description: 'Array of photo id on gift',
    type: [String],
  })
  photos?: string[];

  @IsString()
  // @IsMongoId()
  @IsOptional()
  @ApiProperty({
    description: 'Main photo id',
    example: '5f7c1ddbb7ff8d7f11d46061',
    type: String,
  })
  mainPhoto?: string;

  @IsString()
  @IsMongoId()
  ownerId: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Gift complete',
    type: Boolean,
    default: false,
  })
  completed: boolean;

  @IsBoolean()
  deleted: boolean;
}
