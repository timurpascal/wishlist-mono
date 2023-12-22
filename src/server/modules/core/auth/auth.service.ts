import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcryptjs';
import { Model } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import { JwtTokenDto } from './dto/jwtToken.dto';
import { UserPrivateGetDto } from '../../domain/users/dto/user.private.get.dto';
import { BadRequestErrors } from './../../common/errors/badRequest.errors';
import { UserLoginDto } from './../../domain/users/dto/user.login.dto';
import { AccessTokenDto } from './dto/accessToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private logger: PinoLogger,
    @InjectModel('User') private readonly userModel: Model<any>,
  ) {
    this.logger.setContext('AuthContext');
  }

  async getProfile(user): Promise<UserPrivateGetDto> {
    const userFromDb = await this.userModel.findById(user.id);
    return new UserPrivateGetDto(userFromDb);
  }

  async login(user: UserLoginDto): Promise<AccessTokenDto> {
    const userFromDb = await this.userModel.findOne({
      email: user.email,
      deleted: false,
    });
    if (userFromDb) {
      const compareResult = await compare(user.password, userFromDb.passHash);
      const userToCreateToken: JwtTokenDto = {
        id: userFromDb.id,
        firstName: userFromDb.firstName,
        lastName: userFromDb.lastName,
      };
      if (compareResult) {
        return {
          accessToken: this.jwtService.sign(userToCreateToken),
        };
      } else {
        this.logger.warn(`Bad login or password for userId = ${userFromDb.id}`);
        throw new UnauthorizedException(BadRequestErrors.unauthorized('Bad login or password'));
      }
    } else {
      this.logger.warn(`Login with broken email = ${user.email}`);
      throw new UnauthorizedException(BadRequestErrors.unauthorized('Bad login or password'));
    }
  }
}
