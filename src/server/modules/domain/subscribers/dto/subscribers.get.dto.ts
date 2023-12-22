import { PickType } from '@nestjs/swagger';
import { SubscriberModel } from './subscribers.model';

export class SubscriberGetDto extends PickType(SubscriberModel, ['sourceId', 'destinationId']) {
  constructor(partial: Partial<SubscriberGetDto> = {}) {
    super();
    this.destinationId = partial.destinationId;
    this.sourceId = partial.sourceId;
  }
}
