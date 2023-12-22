import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BaseErrorDto } from '../../common/errors/baseErrorDto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt.guard';
import { MongoIdParse } from './../../common/pipes/mongoId.pipe';
import { SubscriberGetDto } from './dto/subscribers.get.dto';
import { SubscriberService } from './subscriber.service';

@ApiTags('Subscribers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({
  description: 'The authorization session has expired or you are not logged in, please log in.',
  type: BaseErrorDto,
})
@Controller('/subscribers')
export class SubscriberController {
  constructor(private readonly subscribeService: SubscriberService) {}

  @Post(':userId')
  subscribe(@Param('userId', MongoIdParse) dstUserId: string, @Request() req): Promise<SubscriberGetDto> {
    return this.subscribeService.createSubscribe(req.user, dstUserId);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  unsubscribe(@Param('userId', MongoIdParse) dstUserId: string): Promise<boolean> {
    return this.subscribeService.deleteSubscribe(dstUserId);
  }

  @Get(':userId')
  test(@Param('userId', MongoIdParse) id: string) {
    return this.subscribeService.getSubscribersByUserId(id);
  }
}
