import axios from 'axios';
import qs from 'qs';
import { getAccessToken, getRefreshToken, removeTokens, setTokens } from '@/src/storage/auth-helper';
import { ApiRoutes } from '@/src/api/api-routes';
import { AuthResponse } from '@/src/api/auth/models';

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

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    const isRefreshRequest = originalRequest.url?.includes('refresh-token');

    if (
      accessToken &&
      (error.response?.status === 401 || error.response?.status === 410) &&
      !originalRequest._retry
    ) {
      if (isRefreshRequest) {
        removeTokens();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axiosInstance.put<AuthResponse>(
          `${ApiRoutes.AUTH}/refresh-token`,
          {refreshToken: refreshToken},
          { withCredentials: true },
        );

        const newToken = response.data.accessToken;
        setTokens(newToken, response.data.refreshToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        removeTokens();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

