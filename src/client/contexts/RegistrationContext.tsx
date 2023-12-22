import jwt from 'jwt-decode';
import React, { useState } from 'react';
/** константы */
import { DEFAULT_REGISTER, TOKEN } from '../constants/common';

/** интерфейс регистрации */
export interface Registration {
  jwtFirstName: string;
  jwtLastName: string;
  jwtEmail: string;
  jwtPassword: string;
  jwtLocale: string;
  jwtBio: string;
  jwtLogin: string;
  id: string;
  token: string;
}

/** интерфейс контекста регистрации */
interface IAuthContext {
  registration: Registration;
  setRegistration: (userRegister: Registration) => void;
  createRegistration: (userRegister: Registration) => void;
  removeRegistration: () => void;
}

/** Специальный хук регистрационного контекста */
const useRegistrationHandler = (initialUser: Registration) => {
  const [registration, setRegistration] = useState<Registration>(initialUser);

  const createRegistration = (userRegistration: Registration) => {
    const { token } = userRegistration;
    localStorage.setItem(TOKEN, token);
    setRegistration(userRegistration);
  };

  const removeRegistration = () => {
    localStorage.removeItem(TOKEN);
    setRegistration(DEFAULT_REGISTER);
  };

  return { registration, setRegistration, createRegistration, removeRegistration };
};

/**
 * Создает регистрационный контекст
 */
export const RegistrationContext = React.createContext<IAuthContext>({
  registration: DEFAULT_REGISTER,
  // eslint-disable-next-line
  setRegistration: () => {},
  // eslint-disable-next-line
  createRegistration: () => {},
  // eslint-disable-next-line
  removeRegistration: () => {},
});

const { Provider } = RegistrationContext;

/**
 * Создаёт провайдер регистрационного контекста
 * @param children
 * @constructor
 */
const RegistrationProvider = ({ children }: any) => {
  const { registration, setRegistration, createRegistration, removeRegistration } =
    useRegistrationHandler(DEFAULT_REGISTER);

  const token = localStorage.getItem(TOKEN);

  if (token && !registration.id) {
    const { id, jwtFirstName, jwtLastName, jwtEmail, jwtPassword, jwtLocale, jwtBio, jwtLogin } = jwt<any>(token);
    const userRegistration = {
      token,
      id,
      jwtFirstName,
      jwtLastName,
      jwtEmail,
      jwtPassword,
      jwtLocale,
      jwtBio,
      jwtLogin,
    };
    createRegistration(userRegistration);
  }

  return (
    <Provider value={{ registration, setRegistration, createRegistration, removeRegistration }}>{children}</Provider>
  );
};

export default RegistrationProvider;
