import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Gift } from './gift.model';

export class GiftGetDto extends IntersectionType(
  PickType(Gift, ['id', 'name', 'ownerId']),
  PartialType(PickType(Gift, ['reason', 'description', 'tag', 'price', 'photos', 'mainPhoto', 'completed'])),
) {
  constructor(partial: Partial<GiftGetDto> = {}) {
    super();
    this.id = partial.id;
    this.name = partial.name;
    this.reason = partial.reason;
    this.description = partial.description;
    this.tag = partial.tag;
    this.price = partial.price;
    this.photos = partial.photos;
    this.mainPhoto = partial.mainPhoto;
    this.completed = partial.completed;
    this.ownerId = partial.ownerId.toString();
  }
}
