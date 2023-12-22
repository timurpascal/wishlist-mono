import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { AuthContext } from '@contexts/AuthContext';
import AuthService from '@services/AuthService/AuthService';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import jwt from 'jwt-decode';
import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.style.css';

const Login = () => {
  const { auth, createAuth } = useContext(AuthContext);
  const history = useHistory();

  const onFinish = async ({ email, password }) => {
    const token = await AuthService.authorize({ email, password });
    const { id, firstName, lastName } = jwt<any>(token);
    const userAuth = {
      token,
      id,
      firstName,
      lastName,
    };
    createAuth(userAuth);
  };

  useEffect(() => {
    if (auth.token) {
      history.push(`/user/${auth.id}`);
    }
  }, [auth, history]);

  return (
    <div className="wrapper">
      <Row justify="center">
        <Col xs={22} sm={20} md={16} lg={10} xl={8}>
          <h1 className="title">Вход</h1>
          <Card>
            <Form onFinish={onFinish}>
              <Form.Item rules={[{ required: true, message: 'Пожалуйста введите логин.' }]} name="email">
                <Input size="large" placeholder="Логин" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item rules={[{ required: true, message: 'Пожалуйста введите пароль.' }]} name="password">
                <Input.Password size="large" placeholder="Пароль" prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item className="last-row">
                <div className="button_wrapper">
                  <Button type="primary" size="large" htmlType="submit">
                    Войти
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <div className="link-wrapper">
              <Link to="/register">Зарегистрироваться</Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
