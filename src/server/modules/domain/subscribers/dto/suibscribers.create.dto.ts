import { PickType } from '@nestjs/swagger';
import { SubscriberModel } from './subscribers.model';

export class SubscriberCreateDto extends PickType(SubscriberModel, ['sourceId', 'destinationId']) {
  constructor(partial: Partial<SubscriberCreateDto> = {}) {
    super();
    this.destinationId = partial.destinationId;
    this.sourceId = partial.sourceId;
  }
}
