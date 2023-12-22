import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { User } from './user.model';

export class UserPublicGetDto extends IntersectionType(
  PickType(User, ['id', 'firstName', 'lastName', 'locale']),
  PartialType(PickType(User, ['bio', 'login', 'gender', 'avatarId'])),
) {
  constructor(partial: Partial<UserPublicGetDto>) {
    super();
    // Object.assign(this, partial);
    this.id = partial.id;
    this.firstName = partial.firstName;
    this.lastName = partial.lastName;
    this.locale = partial.locale;
    this.avatarId = partial.avatarId;
    this.bio = partial.bio;
    this.login = partial.login;
    this.gender = partial.gender;
  }
}
