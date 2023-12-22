import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsString, Length } from 'class-validator';
import { BaseDBObject } from '../../../common/baseDbObject';
import { userValidator as valid } from '../validator/user.validator';

export class User extends BaseDBObject {
  @ApiProperty({
    example: 'Vasya',
    description: 'FirstName for user',
    required: valid.firstName.required,
    maxItems: valid.firstName.maxlength,
    minItems: valid.firstName.minlength,
  })
  @IsString()
  @Length(valid.firstName.minlength, valid.firstName.maxlength)
  firstName: string;

  @ApiProperty({
    example: 'Petrov',
    description: 'LastName',
    required: valid.lastName.required,
    maxItems: valid.lastName.maxlength,
    minItems: valid.lastName.minlength,
  })
  @IsString()
  @Length(valid.lastName.minlength, valid.lastName.maxlength)
  lastName: string;

  @IsString()
  @IsMongoId()
  @ApiProperty({
    description: 'Avatar id',
    example: '5f7c1ddbb7ff8d7f11d46061',
  })
  avatarId?: string;

  @IsString()
  passHash?: string;

  @ApiProperty({
    example: 'MyVeryStrongPassword',
    description: 'Password for registration user',
    maxItems: valid.password.maxlength,
    minItems: valid.password.minlength,
  })
  @Length(valid.password.minlength, valid.password.maxlength)
  @IsString()
  password?: string;

  @ApiProperty({
    example: 'naggibator',
    description: 'Unique nick for change id',
    maxItems: valid.login.maxlength,
    minItems: valid.login.minlength,
    uniqueItems: valid.login.unique,
  })
  @IsString()
  @Length(valid.login.minlength, valid.login.maxlength)
  login?: string;

  @ApiProperty({
    description: 'Locale user (for interface language)',
    example: 'ru',
    default: valid.locale.default,
    required: valid.locale.required,
    enum: valid.locale.enum,
    type: valid.locale.type,
  })
  @IsString()
  // TODO: Enum validate
  locale?: string;

  @ApiProperty({
    example: 'male',
    description: 'Only two gender allowed - humble ourselves',
    enum: valid.gender.enum,
    type: valid.gender.type,
  })
  @IsString()
  // TODO: Enum validate
  gender?: string;

  @ApiProperty({
    example: 'I am Vasya and i am from village',
    description: 'Description your bio for another users (not support md/html/etc)',
    maxItems: valid.bio.maxlength,
    minItems: valid.bio.minlength,
  })
  @IsString()
  @Length(valid.bio.minlength, valid.bio.maxlength)
  bio?: string;

  @ApiProperty({
    example: 'vasya@mail.ru',
    description: 'Email for notification',
    uniqueItems: valid.email.unique,
    required: valid.email.required,
    maxItems: valid.email.maxlength,
    minItems: valid.email.minlength,
  })
  @IsString()
  @IsEmail()
  @Length(valid.email.minlength, valid.email.maxlength)
  email: string;

  // @ApiProperty({
  //   example: '+78005553535',
  //   description: 'Phone number for notification/validation',
  //   required: valid.mobilePhone.required,
  //   uniqueItems: valid.mobilePhone.unique,
  //   maxItems: valid.mobilePhone.maxlength,
  //   minItems: valid.mobilePhone.minlength,
  // })
  // @IsString()
  // @IsPhoneNumber('RU')
  // @IsOptional()
  // @Length(valid.mobilePhone.minlength, valid.mobilePhone.maxlength)
  // mobilePhone?: string;
}
