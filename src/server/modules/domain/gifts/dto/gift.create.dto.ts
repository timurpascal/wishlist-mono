import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Gift } from './gift.model';

export class GiftCreateDto extends IntersectionType(
  PickType(Gift, ['name']),
  PartialType(PickType(Gift, ['description', 'reason', 'tag', 'price', 'photos', 'mainPhoto'])),
) {
  constructor(partial: Partial<GiftCreateDto> = {}) {
    super();
    Object.assign(this, partial);
    // this.name = partial.name;
    // this.description = partial.description;
    // this.price = partial.price;
    // this.reason = partial.reason;
    // this.tag = partial.tag;
    // this.photos = partial.photos;
    // this.mainPhoto = partial.mainPhoto;
  }
}
