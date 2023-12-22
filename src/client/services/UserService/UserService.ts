import { Gift } from '@services/GiftService/GiftService.types';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../api/axiosInstance';
import { User } from './UserService.types';

const USER_ROUTE = '/users';

/** сервис для работы с пользователем */
const UserService = {
  getUser: async (id: string) => {
    const { data }: AxiosResponse<User> = await axiosInstance.get(`${USER_ROUTE}/${id}`);
    return data;
  },
  getUsers: async () => {
    const { data }: AxiosResponse<User[]> = await axiosInstance.get(USER_ROUTE);
    return data;
  },
  getSubscribers: async (id: string) => {
    const { data }: AxiosResponse<User[]> = await axiosInstance.get(`${USER_ROUTE}/${id}/subscribers`);
    return data;
  },
  getGifts: async (id: string) => {
    const { data }: AxiosResponse<Gift[]> = await axiosInstance.get(`${USER_ROUTE}/${id}/gifts`);
    return data;
  },
};

export default UserService;
