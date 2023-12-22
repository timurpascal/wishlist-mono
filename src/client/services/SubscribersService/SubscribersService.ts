import { axiosInstance } from '../../api/axiosInstance';
import { Subscriber } from './SubscribersService.types';

const SUBSCRIBER_ROUTE = '/subscribers';

/** сервис для работы с пользователем */
const SubscribersService = {
  setSubscriber: async (userId: string) => {
    const { data } = await axiosInstance.post(`${SUBSCRIBER_ROUTE}/${userId}`);
    return data;
  },
  deleteSubscriber: async (userId: string) => {
    const { data } = await axiosInstance.delete(`${SUBSCRIBER_ROUTE}/${userId}`);
    return data;
  },
  getSubscribers: async (userId: string): Promise<Subscriber[]> => {
    const { data } = await axiosInstance.get<Subscriber[]>(`${SUBSCRIBER_ROUTE}/${userId}`);

    return data;
  },
};

export default SubscribersService;
