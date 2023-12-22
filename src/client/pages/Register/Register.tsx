/** библиотеки */
import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import jwt from 'jwt-decode';
/** компоненты библиотеки */
import { Row, Col, Input, Card, Button, Form } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import RegistrationService from '../../services/Registration';
import { RegistrationContext } from '../../contexts/RegistrationContext';
/** стили */
import './Register.style.css';

const Register = () => {
  const { registration, createRegistration } = useContext(RegistrationContext);
  const history = useHistory();

  const onFinish = async ({ firstName, lastName, email, password, locale, bio, login, gender }) => {
    const token = await RegistrationService.registration({
      firstName,
      lastName,
      email,
      password,
      locale,
      bio,
      login,
      gender,
    });
    const { id, jwtFirstName, jwtLastName, jwtEmail, jwtPassword, jwtLocale, jwtBio, jwtLogin, jwtGender } = jwt<any>(
      token,
    );
    const userRegistration = {
      jwtFirstName,
      jwtLastName,
      jwtEmail,
      jwtPassword,
      jwtLocale,
      jwtBio,
      jwtLogin,
      jwtGender,
      id,
      token,
    };
    createRegistration(userRegistration);
  };
  useEffect(() => {
    if (registration.token) {
      history.push(`/user/${registration.id}`);
    }
  }, [registration, history]);
  return (
    <div className="wrapper">
      <Row justify="center">
        <Col xs={22} sm={20} md={16} lg={10} xl={8}>
          <h1 className="title">Регистрация</h1>
          <Card>
            <Form onFinish={onFinish}>
              <Form.Item rules={[{ required: true, message: 'Пожалуйста введите имя.' }]}>
                <Input.Group compact>
                  <Form.Item noStyle rules={[{ required: true, message: 'Пожалуйста введите имя.' }]} name="firstName">
                    <Input style={{ width: '50%' }} placeholder="Имя" size="large" />
                  </Form.Item>
                  <Form.Item noStyle rules={[{ required: true, message: 'Пожалуйста введите имя.' }]} name="lastName">
                    <Input style={{ width: '50%' }} placeholder="Фамилия" size="large" />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
              <Form.Item rules={[{ type: 'email' }]} name="email">
                <Input size="large" placeholder="Email" />
              </Form.Item>
              <Form.Item rules={[{ required: true, message: 'Пожалуйста введите locale.' }]} name="locale">
                <Input size="large" placeholder="Locale" />
              </Form.Item>
              <Form.Item rules={[{ required: true, message: 'Пожалуйста расскажите о себе.' }]} name="bio">
                <Input size="large" placeholder="Bio" />
              </Form.Item>
              <Form.Item rules={[{ required: true, message: 'Пожалуйста введите логин.' }]} name="login">
                <Input size="large" placeholder="Login" />
              </Form.Item>
              <Form.Item rules={[{ required: true, message: 'Пожалуйста введите gender.' }]} name="gender">
                <Input size="large" placeholder="Gender" />
              </Form.Item>
              <Form.Item rules={[{ required: true, message: 'Пожалуйста введите пароль.' }]} name="password">
                <Input.Password size="large" placeholder="Пароль" prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item rules={[{ required: true, message: 'Пожалуйста подтвердите пароль.' }]} name="passwordConfirm">
                <Input.Password size="large" placeholder="Подтверждение пароля" prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item className="last-row">
                <div className="button_wrapper">
                  <Button type="primary" size="large" htmlType="submit">
                    Зарегистрироваться
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <div className="link-wrapper">
              <Link to="/login">Выполнить вход</Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
