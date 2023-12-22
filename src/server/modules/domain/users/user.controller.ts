import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MongoIdParse } from '../../common/pipes/mongoId.pipe';
import { JwtAuthGuard } from '../../core/auth/guards/jwt.guard';
import { GiftGetDto } from '../gifts/dto/gift.get.dto';
import { BaseErrorDto } from './../../common/errors/baseErrorDto';
import { UserCreateDto } from './dto/user.create.dto';
import { UserPrivateGetDto } from './dto/user.private.get.dto';
import { UserPublicGetDto } from './dto/user.public.get.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Register new user',
    type: UserPrivateGetDto,
  })
  @ApiUnauthorizedResponse({
    description: 'The authorization session has expired or you are not logged in, please log in',
    type: BaseErrorDto,
  })
  @ApiBadRequestResponse({
    description:
      'the sent data is not valid, please study the server error and form your data according to the DTO scheme',
    type: BaseErrorDto,
  })
  create(@Body() userCreateDto: UserCreateDto): Promise<UserPrivateGetDto> {
    return this.userService.create(userCreateDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Get all created users',
    type: UserPublicGetDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'The authorization session has expired or you are not logged in, please log in',
    type: BaseErrorDto,
  })
  findAll(): Promise<UserPublicGetDto[]> {
    return this.userService.findAll();
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Update user',
    type: UserPrivateGetDto,
  })
  updateUser(@Request() req, @Body() user: UserUpdateDto): Promise<UserPrivateGetDto> {
    return this.userService.updateOne(req.user.id, user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get one user',
    type: UserPublicGetDto,
  })
  @ApiUnauthorizedResponse({
    description: 'The authorization session has expired or you are not logged in, please log in',
    type: BaseErrorDto,
  })
  @ApiBadRequestResponse({ description: 'Id is not valid', type: BaseErrorDto })
  @ApiNotFoundResponse({
    description: 'User with send id not found',
    type: BaseErrorDto,
  })
  findOne(@Param('id', MongoIdParse) id: string): Promise<UserPublicGetDto> {
    return this.userService.findOne(id);
  }

  @Get(':id/gifts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get all gift by user id',
    type: GiftGetDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Id is not valid', type: BaseErrorDto })
  @ApiNotFoundResponse({
    description: 'User with send id not found',
    type: BaseErrorDto,
  })
  @ApiUnauthorizedResponse({
    description: 'The authorization session has expired or you are not logged in, please log in',
    type: BaseErrorDto,
  })
  findAllGiftByUserId(@Param('id', MongoIdParse) id: string): Promise<GiftGetDto[]> {
    return this.userService.findAllGiftByUserId(id);
  }

  @Get(':id/subscribers')
  getAllSubscribersByUserId(@Param('id', MongoIdParse) id: string): Promise<UserPublicGetDto[]> {
    return this.userService.getSubscribersByUserId(id);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.GONE)
  @ApiBadRequestResponse({ description: 'Id is not valid', type: BaseErrorDto })
  @ApiNotFoundResponse({
    description: 'User with send id not found',
    type: BaseErrorDto,
  })
  @ApiUnauthorizedResponse({
    description: 'The authorization session has expired or you are not logged in, please log in',
    type: BaseErrorDto,
  })
  deleteYouself(@Request() req): Promise<void> {
    return this.userService.deleteOne(req.user.id);
  }
}
