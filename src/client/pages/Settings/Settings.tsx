import React from 'react';

// interface UserDataForm {
//   firstName: string;
//   lastName: string;
//   login: string;
//   bio: string;
//   password: string;
// }

const Settings = () => {
  // const { auth } = useContext(AuthContext);
  // const [user, setUser] = useState<UserDataForm>();

  // const getUserData = async () => {
  //   const userData = await UserService.getUser(auth.id);
  //   const formUserData = {
  //     firstName: userData.firstName,
  //     lastName: userData.lastName,
  //     login: userData.login,
  //     bio: userData.bio,
  //     password: userData.password,
  //   };
  //   setUser(formUserData);
  // };

  // useEffect(() => {
  //   getUserData();
  // });

  return (
    <>
      {/* {user && (
        <Row>
          <Col span={16} offset={4}>
            <Form name="basic" initialValues={user}>
              <Form.Item label="Имя" name="firstName">
                <Input />
              </Form.Item>

              <Form.Item label="Фамилия" name="lastName">
                <Input />
              </Form.Item>

              <Form.Item label="Логин" name="login">
                <Input />
              </Form.Item>

              <Form.Item label="О себе" name="bio">
                <Input />
              </Form.Item>

              <Form.Item label="Пароль" name="password">
                <Input.Password />
              </Form.Item>

              <Form.Item label="Подтвердить пароль" name="password">
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )} */}
    </>
  );
};

export default Settings;
