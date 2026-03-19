import { useMutation, useQuery } from '@tanstack/react-query';
import { AUTH_KEYS } from '@/src/api/auth/keys';
import { Api } from '@/src/api/api-client';
import { getAccessToken, getRefreshToken, setTokens } from '@/src/storage/auth-helper';
import * as Burnt from 'burnt';
import { AxiosError } from 'axios';
import { userRoles } from '@/src/types/userRoles';
import { Alert } from 'react-native';

export const useLogin = () => {
  return useMutation({
    mutationKey: AUTH_KEYS.login,
    mutationFn: Api.auth.login,
    onSuccess: (data) => {
      if (
        userRoles[data.user.role].value !== 'VERIFIER' &&
        userRoles[data.user.role].value !== 'ADMIN'
      ) {
        Alert.alert(
          'Отказано в доступе',
          'Ваш аккаунт не соответствует требованиям приложения.'
        );
        return;
      }
      setTokens(data.accessToken, data.refreshToken);
      Burnt.toast({
        title: 'Вы успешно вошли в систему',
        preset: 'done'
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (!error.response) {
          Burnt.toast({
            title: 'Нет соединения с сервером',
            preset: 'error'
          });
        } else if (error.response.status === 403) {
          Burnt.toast({
            title: 'Неверный email или пароль',
            preset: 'error'
          });
        } else {
          Burnt.toast({
            title: 'Произошла ошибка при входе в систему',
            preset: 'error'
          });
        }
      }
    }
  });
};

export const useMe = () => {
  const token = getAccessToken();
  const refreshToken = getRefreshToken();

  return useQuery({
    enabled: !!token,
    refetchOnWindowFocus: false,
    retry: false,
    queryKey: AUTH_KEYS.me,
    queryFn: () => Api.auth.refreshToken(refreshToken),
    staleTime: Infinity
  })

}