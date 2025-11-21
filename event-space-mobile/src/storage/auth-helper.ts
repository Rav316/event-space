import { storage } from '@/src/storage/storage';
import { STORAGE_KEYS } from '@/src/storage/keys';

export const getAccessToken = () => {
  return storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return storage.getString(STORAGE_KEYS.REFRESH_TOKEN);
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const removeTokens = () => {
  storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
  storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
};
