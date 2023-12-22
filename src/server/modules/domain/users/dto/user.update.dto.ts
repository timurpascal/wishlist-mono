import { PartialType } from '@nestjs/swagger';
import { UserCreateDto } from './user.create.dto';

export class UserUpdateDto extends PartialType(UserCreateDto) {
  constructor(partial: Partial<UserUpdateDto> = {}) {
    super();
    Object.assign(this, partial);
  }
}
