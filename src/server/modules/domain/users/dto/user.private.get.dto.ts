import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { User } from './user.model';

export class UserPrivateGetDto extends IntersectionType(
  PickType(User, ['id', 'firstName', 'lastName', 'locale', 'email']),
  PartialType(PickType(User, ['bio', 'login', 'gender', 'avatarId'])),
) {
  constructor(partial: Partial<UserPrivateGetDto>) {
    super();
    // Object.assign(this, partial);
    this.id = partial.id;
    this.firstName = partial.firstName;
    this.lastName = partial.lastName;
    this.email = partial.email;
    this.avatarId = partial.avatarId;
    // this.mobilePhone = partial.mobilePhone;
    this.locale = partial.locale;
    this.bio = partial.bio;
    this.login = partial.login;
    this.gender = partial.gender;
  }
}
