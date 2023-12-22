import { PickType } from '@nestjs/swagger';
import { User } from './user.model';

export class UserLoginDto extends PickType(User, ['email', 'password']) {
  constructor(partial: Partial<UserLoginDto> = {}) {
    super();
    // this.email = partial.email;
    // this.password = partial.password;
    Object.assign(this, partial);
  }
}
