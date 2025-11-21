import axios from 'axios';
import qs from 'qs';
import { getAccessToken } from '@/src/storage/auth-helper';

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
