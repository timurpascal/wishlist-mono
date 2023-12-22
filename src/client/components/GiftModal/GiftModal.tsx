import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { GiftGetDto } from '../../../server/modules/domain/gifts/dto/gift.get.dto';
import GiftService from '../../services/GiftService/GiftService';
import ClearModal from '../ClearModal/ClearModal';
import { MODAL_MODES } from './GiftModal.const';
import './GiftModal.styl';
import { IGiftModal } from './GiftModal.types';
import GiftModalEdit from './GiftModalEdit/GiftModalEdit';
import GiftModalView from './GiftModalView/GiftModalView';

const GiftModal: React.FC<IGiftModal> = ({ giftId, close, initialMode = MODAL_MODES.view }: IGiftModal) => {
  const [gift, setGift] = useState<GiftGetDto | null>(null);
  const [modalMode, setModalMode] = useState(initialMode);
  const closeGiftModal = () => {
    setGift(null);
    close();
  };

  const fetchGift = async (id: string) => {
    const gift = await GiftService.getGift(id);
    setGift(gift);
  };

  const changeMode = () => {
    if (modalMode === MODAL_MODES.view) {
      setModalMode(MODAL_MODES.edit);
    } else {
      setModalMode(MODAL_MODES.view);
    }
  };

  useEffect(() => {
    if (giftId) {
      fetchGift(giftId);
    }
  }, [giftId]);

  return (
    <ClearModal visible={!!giftId} close={closeGiftModal}>
      <div className="gift-modal">
        {modalMode === MODAL_MODES.view ? <GiftModalView gift={gift} /> : <GiftModalEdit />}
        <div className="gift-modal__control control">
          <div className="control__button" onClick={changeMode}>
            <EditOutlined className="control__button__icon" />
          </div>
          <div className="control__button">
            <DeleteOutlined className="control__button__icon" />
          </div>
        </div>
      </div>
    </ClearModal>
  );
};

export default GiftModal;
