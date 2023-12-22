import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from '@contexts/AuthContext';
import SubscribersService from '@services/SubscribersService/SubscribersService';
import UserService from '@services/UserService/UserService';
import { User } from '@services/UserService/UserService.types';
import { Avatar, Button, Col, List, Row, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import './Friends.style.css';

const { Text } = Typography;

const Friends = () => {
  const { auth } = useContext(AuthContext);
  const [subs, setSubs] = useState<User[]>();
  const getData = async () => {
    const subsData = await UserService.getSubscribers(auth.id);
    setSubs(subsData);
  };

  const unSubscribe = async (id: string) => {
    await SubscribersService.deleteSubscriber(id);
    await getData();
  };

  useEffect(() => {
    getData();
  });

  return (
    <Row>
      <Col span={16} offset={4}>
        {subs && (
          <List
            itemLayout="horizontal"
            dataSource={subs}
            renderItem={sub => (
              <List.Item className="list-item">
                <List.Item.Meta
                  avatar={<Avatar size="large" icon={<UserOutlined />} />}
                  title={<Text strong>{`${sub.firstName} ${sub.lastName}`}</Text>}
                  description={sub.bio}
                />
                <Button danger type="text" className="list-item__button" onClick={() => unSubscribe(sub.id)}>
                  Удалить
                </Button>
              </List.Item>
            )}
          />
        )}
      </Col>
    </Row>
  );
};

export default Friends;
