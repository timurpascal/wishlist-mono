import Gift from '@components/Gift/Gift';
import { Gift as GiftType } from '@services/GiftService/GiftService.types';
import { Col, Row } from 'antd';
import React from 'react';

interface GiftListProps {
  gifts: GiftType[];
  selectGift: (giftId) => void;
}

const GiftList = ({ gifts, selectGift }: GiftListProps) => {
  const openGift = (gift: GiftType) => {
    selectGift(gift.id);
  };

  return (
    <Row className="card-wrapper" gutter={[16, 16]}>
      {gifts.map(gift => (
        <Col xs={24} sm={12} md={8} lg={8} xl={6} key={gift.id}>
          <Gift gift={gift} onClick={openGift} />
        </Col>
      ))}
    </Row>
  );
};

export default GiftList;
