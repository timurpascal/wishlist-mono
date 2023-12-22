import axios from 'axios';
import { TOKEN } from '../constants/common';

const headers = {
  'Content-Type': 'application/json',
};

export const axiosInstance = axios.create({
  baseURL: '/api',
  headers,
});

axiosInstance.interceptors.request.use(conf => {
  const token = localStorage.getItem(TOKEN);
  if (!token) {
    delete conf.headers.Authorization;
    window.location.href = '/login';
  } else {
    conf.headers.Authorization = `Bearer ${token}`;
  }
  return conf;
});
