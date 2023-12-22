import { Auth } from '../contexts/AuthContext';
import { Registration } from '../contexts/RegistrationContext';

export const DEFAULT_AUTH: Auth = {
  firstName: '',
  lastName: '',
  id: '',
  token: '',
};

export const DEFAULT_REGISTER: Registration = {
  jwtFirstName: '',
  jwtLastName: '',
  jwtEmail: '',
  jwtPassword: '',
  jwtLocale: '',
  jwtBio: '',
  jwtLogin: '',
  id: '',
  token: '',
};

export const TOKEN = 'token';
