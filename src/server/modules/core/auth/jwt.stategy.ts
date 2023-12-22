import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigurationService } from './../config/config.service';
import { JwtTokenDto } from './dto/jwtToken.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  validate(payload: any) {
    const validUser: JwtTokenDto = {
      id: payload.id,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
    return validUser;
  }
}
