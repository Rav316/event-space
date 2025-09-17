import axios from 'axios';
import { useAuthStore } from '@/store/use-auth-store.ts';
import type { AuthResponse } from '@/api/auth/model.ts';
import { ApiRoutes } from '@/api/api-routes.ts';


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000
})

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

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

    if (error.response?.status === 401 || error.response?.status === 410 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers["Authorization"] = "Bearer " + token;
            }
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
          { withCredentials: true }
        )

        const newToken = response.data.accessToken;
        authStore.setToken(newToken);

        processQueue(null, newToken);

        originalRequest.headers["Authorization"] = "Bearer " + newToken;
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
  }
);