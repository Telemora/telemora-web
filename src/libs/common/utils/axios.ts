import axios from 'axios';
import { environment } from '@environments';

const axiosInstance = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    const initData = window.Telegram.WebApp.initData;

    if (initData) {
      config.headers['Authorization'] = `tma ${initData}`;
    }
  }
  return config;
});

export default axiosInstance;
