import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../api/axiosInstance';
import { AccessToken, AuthContract } from './AuthService.types';

const AuthService = {
  authorize: async (auth: AuthContract) => {
    const { data }: AxiosResponse<AccessToken> = await axiosInstance.post('auth/login', auth, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    const { accessToken } = data;
    return accessToken;
  },
};

export default AuthService;
