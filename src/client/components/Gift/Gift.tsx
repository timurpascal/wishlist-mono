import { Gift as GiftType } from '@services/GiftService/GiftService.types';
import { Card, Image, Typography } from 'antd';
import React from 'react';
import './Gift.style.css';

const { Title, Text } = Typography;

interface GiftInterface {
  gift: GiftType;
  onClick: (gift: GiftType) => void;
}

const Gift = ({ gift, onClick }: GiftInterface) => {
  return (
    <Card
      className="card"
      cover={<Image className="card__image" src={gift.mainPhoto} preview={false} />}
      onClick={() => onClick(gift)}
    >
      <Title className="card__title" level={4}>
        {gift.name}
      </Title>
      <Text className="card__text">{gift.description}</Text>
    </Card>
  );
};

export default Gift;
