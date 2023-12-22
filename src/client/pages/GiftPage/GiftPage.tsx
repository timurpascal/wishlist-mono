import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import GiftService from '@services/GiftService/GiftService';
import { Gift } from '@services/GiftService/GiftService.types';
import UserService from '@services/UserService/UserService';
import { Button, Col, Image, Row, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './GiftPage.style.css';

const { Title } = Typography;

/**
 * Страница подарка
 */
const GiftPage = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [gift, setGift] = useState<Gift>();
  const [isModal, setIsModal] = useState(false);
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);

  const getGiftInfo = async (id: string) => {
    const giftData = await GiftService.getGift(id);
    const userGift = await UserService.getGifts(auth.id);
    const isFind = userGift.find(gift => gift.id === id);
    setIsEdit(!!isFind);
    setGift(giftData);
  };

  const onConfirmModal = async (updatedGift: Gift) => {
    const fullGift = { ...gift, ...updatedGift };
    const updatedFromServerGift = await GiftService.updateGift(fullGift);
    setGift(updatedFromServerGift);
    setIsModal(false);
  };

  const closeModal = () => {
    setIsModal(false);
  };
  const openModal = () => {
    setIsModal(true);
  };

  const deleteGift = async () => {
    await GiftService.deleteGift(gift.id);
    history.push('/user');
  };

  useEffect(() => {
    getGiftInfo(id);
  }, [id]);

  return (
    <>
      {gift && (
        <>
          <Row>
            <Col span={8} offset={2}>
              <Image width="100%" src={gift.photos[0]} />
              {isEdit && (
                <div className="controls">
                  <Button size="large" icon={<EditOutlined />} type="text" onClick={openModal}>
                    Редактировать
                  </Button>
                  <Button size="large" icon={<DeleteOutlined />} danger type="text" onClick={deleteGift}>
                    Удалить
                  </Button>
                </div>
              )}
            </Col>
            <Col span={8} offset={1}>
              <Title level={1}>{gift.name}</Title>
              <Title level={2} className="price" code>
                {gift.price}&#8381;
              </Title>
              <Title level={5}>{gift.description}</Title>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default GiftPage;
