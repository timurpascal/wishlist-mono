import GiftList from '@components/GiftList/GiftList';
import GiftModal from '@components/GiftModal/GiftModal';
import UserCard from '@components/UserCard/UserCard';
import { AuthContext } from '@contexts/AuthContext';
import { Gift } from '@services/GiftService/GiftService.types';
import UserService from '@services/UserService/UserService';
import { User as UserType } from '@services/UserService/UserService.types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './User.style.css';

/**
 * Страница пользователя
 */
const User = () => {
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState<UserType>();
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isHome, setIsHome] = useState<boolean>(false);
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const { id } = useParams();
  // const isAdd = id === auth.id;

  const openGift = (giftId: string) => {
    setSelectedGift(giftId);
  };

  const closeGift = () => {
    setSelectedGift(null);
  };

  useEffect(() => {
    const getData = async (id: string) => {
      const giftList = await UserService.getGifts(id);
      const userData = await UserService.getUser(id);
      const isHomePage = auth.id === id;
      setUser(userData);
      setIsHome(isHomePage);
      setGifts(giftList);
    };
    getData(id);
  }, [auth.id, id]);
  return (
    <div className="user__wrapper">
      {user && !isHome && <UserCard user={user} />}
      <GiftList gifts={gifts} selectGift={openGift} />
      {/* {isAdd && (
        <Button type="primary" icon={<PlusOutlined />} size="large" className="add-gift" onClick={showGiftCreator} />
      )} */}
      <GiftModal close={closeGift} giftId={selectedGift} />
    </div>
  );
};

export default User;
