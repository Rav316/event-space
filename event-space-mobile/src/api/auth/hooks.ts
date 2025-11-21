import { useMutation } from '@tanstack/react-query';
import { AUTH_KEYS } from '@/src/api/auth/keys';
import { Api } from '@/src/api/api-client';
import { setTokens } from '@/src/storage/auth-helper';
import * as Burnt from 'burnt';
import { AxiosError } from 'axios';

export const useLogin = () => {
  return useMutation({
    mutationKey: AUTH_KEYS.login,
    mutationFn: Api.auth.login,
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      Burnt.toast({
        title: 'Вы успешно вошли в систему',
        preset: 'done'
      })
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        if(error.response?.status === 403) {
          Burnt.toast({
            title: 'Неверный email или пароль',
            preset: 'error'
          })
        } else {
          Burnt.toast({
            title: 'Произошла ошибка при входе в систему',
            preset: 'error'
          })
        }
      }
    }
  })
}