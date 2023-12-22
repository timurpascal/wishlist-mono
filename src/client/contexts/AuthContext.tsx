/** библиотеки */
/** константы */
import { DEFAULT_AUTH, TOKEN } from '@constants/common';
import jwt from 'jwt-decode';
import React, { useState } from 'react';

/** интерфейс авторизации */
export interface Auth {
  firstName: string;
  lastName: string;
  id: string;
  token: string;
}

/** интерфейс контекста авторизации */
interface IAuthContext {
  auth: Auth;
  setAuth: (userAuth: Auth) => void;
  createAuth: (userAuth: Auth) => void;
  removeAuth: () => void;
}

/** Авторизационный контекст приложения */

/** Специальный хук авторизационного контекста */
const useAuthHandler = (initialUser: Auth) => {
  const [auth, setAuth] = useState<Auth>(initialUser);

  const createAuth = (userAuth: Auth) => {
    const { token } = userAuth;
    localStorage.setItem(TOKEN, token);
    setAuth(userAuth);
  };

  const removeAuth = () => {
    localStorage.removeItem(TOKEN);
    setAuth(DEFAULT_AUTH);
  };

  return { auth, setAuth, createAuth, removeAuth };
};

/**
 * Создает Авторизационный контекст
 */
export const AuthContext = React.createContext<IAuthContext>({
  auth: DEFAULT_AUTH,
  // eslint-disable-next-line
  setAuth: () => {},
  // eslint-disable-next-line
  createAuth: () => {},
  // eslint-disable-next-line
  removeAuth: () => {},
});

const { Provider } = AuthContext;

/**
 * Создаёт провайдер Авторизационного контекста
 * @param children
 * @constructor
 */
const AuthProvider = ({ children }: any) => {
  const { auth, setAuth, createAuth, removeAuth } = useAuthHandler(DEFAULT_AUTH);

  const token = localStorage.getItem(TOKEN);

  if (token && !auth.id) {
    const { id, firstName, lastName } = jwt<any>(token);
    const userAuth = {
      token,
      id,
      firstName,
      lastName,
    };
    createAuth(userAuth);
  }

  return <Provider value={{ auth, setAuth, createAuth, removeAuth }}>{children}</Provider>;
};

export default AuthProvider;
