import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/auth/guards/jwt.guard';
import { BaseErrorDto } from './../../common/errors/baseErrorDto';
import { MongoIdParse } from './../../common/pipes/mongoId.pipe';
import { GiftCreateDto } from './dto/gift.create.dto';
import { GiftGetDto } from './dto/gift.get.dto';
import { GiftUpdateDto } from './dto/gift.update.dto';
import { GiftService } from './gift.service';

@ApiTags('Gifts')
@Controller('/gifts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({
  description: 'The authorization session has expired or you are not logged in, please log in.',
  type: BaseErrorDto,
})
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Create new gift',
    type: GiftGetDto,
  })
  @ApiBadRequestResponse({
    description: 'Gift schema not valid',
    type: BaseErrorDto,
  })
  create(@Body() createGiftDto: GiftCreateDto, @Request() req): Promise<GiftGetDto> {
    return this.giftService.create(createGiftDto, req.user);
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all created gifts',
    type: GiftGetDto,
    isArray: true,
  })
  findAll(@Request() req): Promise<GiftGetDto[]> {
    return this.giftService.findAll(req.user);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get gift by id',
    type: GiftGetDto,
  })
  @ApiBadRequestResponse({ description: 'id is not valid', type: BaseErrorDto })
  @ApiNotFoundResponse({ description: 'id not found', type: BaseErrorDto })
  findOne(@Param('id', MongoIdParse) id: string): Promise<GiftGetDto> {
    return this.giftService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update created gift',
    type: GiftGetDto,
  })
  @ApiBadRequestResponse({ description: 'id is not valid', type: BaseErrorDto })
  @ApiNotFoundResponse({ description: 'id not found', type: BaseErrorDto })
  update(@Param('id', MongoIdParse) id: string, @Body() updateDto: GiftUpdateDto): Promise<GiftGetDto> {
    return this.giftService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete created gift',
    type: GiftGetDto,
  })
  @ApiBadRequestResponse({ description: 'id is not valid', type: BaseErrorDto })
  @ApiNotFoundResponse({ description: 'id not found', type: BaseErrorDto })
  delete(@Param('id', MongoIdParse) id: string, @Request() req): Promise<GiftGetDto> {
    return this.giftService.delete(req.user, id);
  }
}
