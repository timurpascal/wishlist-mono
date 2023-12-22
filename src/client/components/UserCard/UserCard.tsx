import { AuthContext } from '@contexts/AuthContext';
import SubscribersService from '@services/SubscribersService/SubscribersService';
import { Subscriber } from '@services/SubscribersService/SubscribersService.types';
import { Button, PageHeader, Row, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';

const { Paragraph } = Typography;

interface UserCardI {
  user: Subscriber;
}

const UserCard = ({ user }: UserCardI) => {
  const { auth } = useContext(AuthContext);
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [isSub, setIsSub] = useState(false);

  const subscribe = async () => {
    await SubscribersService.setSubscriber(user.id);
    setIsSub(!isSub);
  };

  const unSubscribe = async () => {
    await SubscribersService.deleteSubscriber(user.id);
    setIsSub(isSub);
  };

  const getData = async () => {
    const subsData = await SubscribersService.getSubscribers(auth.id);
    setSubs(subsData);
    const subStatus = subs.includes(user);
    setIsSub(subStatus);
  };

  useEffect(() => {
    getData();
  });

  return (
    <PageHeader
      title={`${user.firstName} ${user.lastName}`}
      className="site-page-header"
      extra={[
        <>
          {subs && (
            <>
              {!isSub ? (
                <Button key="1" onClick={subscribe}>
                  Подписаться
                </Button>
              ) : (
                <Button key="2" danger onClick={unSubscribe}>
                  Отписаться
                </Button>
              )}
            </>
          )}
        </>,
      ]}
    >
      <Row>
        <div style={{ flex: 1 }}>
          <Paragraph>{user.bio}</Paragraph>
        </div>
      </Row>
    </PageHeader>
  );
};

export default UserCard;
