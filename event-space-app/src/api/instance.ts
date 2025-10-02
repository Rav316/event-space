import axios from 'axios';
import { useAuthStore } from '@/store/use-auth-store.ts';
import type { AuthResponse } from '@/api/auth/model.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import qs from 'qs';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

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
    const authStore = useAuthStore.getState();

    const isRefreshRequest = originalRequest.url?.includes('refresh-token');

    if (authStore.token && (error.response?.status === 401 || error.response?.status === 410) && !originalRequest._retry) {
      if (isRefreshRequest) {
        authStore.removeToken();
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
          {},
          { withCredentials: true },
        );

        const newToken = response.data.accessToken;
        authStore.setToken(newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        authStore.removeToken();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
