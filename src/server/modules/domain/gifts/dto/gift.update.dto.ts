import { PartialType } from '@nestjs/swagger';
import { GiftCreateDto } from './gift.create.dto';

export class GiftUpdateDto extends PartialType(GiftCreateDto) {
  constructor(partial: Partial<GiftUpdateDto> = {}) {
    super();
    Object.assign(this, partial);
    // this.name = partial.name;
    // this.reason = partial.reason;
    // this.description = partial.description;
    // this.tag = partial.tag;
    // this.price = partial.price;
    // this.photos = partial.photos;
    // this.mainPhoto = partial.mainPhoto;
  }
}
