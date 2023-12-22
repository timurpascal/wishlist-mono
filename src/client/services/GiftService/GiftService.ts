import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../api/axiosInstance';
import { Gift } from './GiftService.types';

const GIFTS_ROUTE = '/gifts';
/**
 * Сервис для работы с подарками
 */
const GiftService = {
  getGiftList: async (): Promise<Gift[]> => {
    const { data }: AxiosResponse<Gift[]> = await axiosInstance.get(GIFTS_ROUTE);
    return data;
  },

  createGift: async (gift: Gift) => {
    const { data }: AxiosResponse<Gift> = await axiosInstance.post(GIFTS_ROUTE, gift);
    return data;
  },

  getGift: async (id: string): Promise<Gift> => {
    const { data }: AxiosResponse<Gift> = await axiosInstance.get(`${GIFTS_ROUTE}/${id}`);
    return data;
  },

  updateGift: async (gift: Gift) => {
    const { data }: AxiosResponse<Gift> = await axiosInstance.put(`${GIFTS_ROUTE}/${gift.id}`, gift);
    return data;
  },

  deleteGift: async (id: string) => {
    const { data }: AxiosResponse<Gift> = await axiosInstance.delete(`${GIFTS_ROUTE}/${id}`);
    return data;
  },
};

export default GiftService;
