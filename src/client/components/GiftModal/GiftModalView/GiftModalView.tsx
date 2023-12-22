import { Carousel, Col, Image, Row, Typography } from 'antd';
import React from 'react';
import './GiftModalView.styl';

const { Title, Text } = Typography;

const GiftModalView = ({ gift }) => {
  const formatter = new Intl.NumberFormat('ru-RU');

  return (
    <Row className="wrapper_flex">
      {gift && (
        <>
          <Col className="carousel" span={16}>
            <Carousel autoplay>
              {gift.photos.map(photo => (
                <Image key={photo} className="carousel__photo__image" src={photo} preview={false} />
              ))}
            </Carousel>
          </Col>
          <Col className="text" span={8}>
            <div>
              <div className="name">
                <Title className="name__text" level={4}>
                  {gift.name}
                </Title>
              </div>
              <div className="description">
                <Text>{gift.description}</Text>
              </div>
            </div>
            <div className="price">
              <Text className="price__text">
                {formatter.format(gift.price)}
                <Text className="price__symbol">₽</Text>
              </Text>
            </div>
          </Col>
        </>
      )}
    </Row>
  );
};

export default GiftModalView;
