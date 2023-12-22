import { HomeOutlined } from '@ant-design/icons';
import { AuthContext } from '@contexts/AuthContext';
import UserService from '@services/UserService/UserService';
import { User } from '@services/UserService/UserService.types';
import { Menu, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Header.style.css';

const { SubMenu } = Menu;
const { Option } = Select;

const Header = () => {
  const { auth, removeAuth } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const history = useHistory();

  const getUsers = async () => {
    const usersData = await UserService.getUsers();
    setUsers(usersData);
  };

  const selectUser = id => {
    history.push(`/user/${id}`);
  };

  const exit = () => {
    removeAuth();
    history.push(`/login`);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Menu mode="horizontal" className="header">
      <Menu.Item key="user" icon={<HomeOutlined />}>
        <Link to={`/user/${auth.id}`}>Главная</Link>
      </Menu.Item>
      <Menu.Item key="friends">
        <Link to="/friends">Подписки</Link>
      </Menu.Item>
      {/* <Menu.Item key="tape" disabled>
        <Link to="/tape">Лента</Link>
      </Menu.Item> */}
      <Menu.Item key="search" disabled className="header__search">
        <Select showSearch style={{ width: 300 }} placeholder="Поиск" optionFilterProp="children" onSelect={selectUser}>
          {users.map(user => (
            <Option value={user.id} key={user.id}>
              {`${user.firstName} ${user.lastName}`}
            </Option>
          ))}
        </Select>
      </Menu.Item>
      <SubMenu key="SubMenu" title={`${auth.firstName} ${auth.lastName}`}>
        <Menu.Item key="setting:1">
          <Link to="/settings">Настройки</Link>
        </Menu.Item>
        <Menu.Item key="setting:2" onClick={exit}>
          <Link>Выход</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
