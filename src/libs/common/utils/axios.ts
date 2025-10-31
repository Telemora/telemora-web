import axios from 'axios';
import { environment } from '@environments';

const axiosInstance = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const initData =
      typeof window !== 'undefined' && window.Telegram?.WebApp?.initData
        ? window.Telegram.WebApp.initData
        : null;

    if (initData) {
      config.headers.Authorization = `tma ${initData}`;
      console.log('✅ Authorization header added');
    } else {
      console.warn('⚠️ No Telegram initData available for request:', config.url);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('🔐 Unauthorized request - initData may be invalid or missing');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
