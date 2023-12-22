import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserPrivateGetDto } from '../../domain/users/dto/user.private.get.dto';
import { BaseErrorDto } from './../../common/errors/baseErrorDto';
import { UserLoginDto } from './../../domain/users/dto/user.login.dto';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/accessToken.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/auth/login')
  login(@Body() userAuthDto: UserLoginDto): Promise<AccessTokenDto> {
    return this.authService.login(userAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    type: BaseErrorDto,
  })
  @Get('/profile')
  getProfile(@Request() req): Promise<UserPrivateGetDto> {
    return this.authService.getProfile(req.user);
  }
}
