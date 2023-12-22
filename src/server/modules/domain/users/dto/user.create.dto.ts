import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { User } from './user.model';
export class UserCreateDto extends IntersectionType(
  PickType(User, ['firstName', 'lastName', 'password', 'email']),
  PartialType(PickType(User, ['bio', 'locale', 'login', 'gender', 'avatarId'])),
) {
  constructor(partial: Partial<UserCreateDto> = {}) {
    super();
    Object.assign(this, partial);
    // this.firstName = partial.firstName;
    // this.lastName = partial.lastName;
    // this.password = partial.password;
    // this.avatarId = partial.avatarId;
    // this.email = partial.email;
    // this.locale = partial.locale;
    // this.bio = partial.bio;
    // this.login = partial.login;
    // // this.mobilePhone = partial.mobilePhone;
    // this.gender = partial.gender;
    // this.passHash = partial.passHash;
  }
}
