import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
