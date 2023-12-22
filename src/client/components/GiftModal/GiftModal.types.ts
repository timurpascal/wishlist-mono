import { MODAL_MODES } from './GiftModal.const';

export interface IGiftModal {
  giftId?: string;
  close: () => void;
  initialMode?: MODAL_MODES;
}
