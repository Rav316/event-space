import { useMutation } from '@tanstack/react-query';
import { Api } from '@/src/api/api-client';
import { queryClient } from '@/src/api/queryClient';
import { AUTH_KEYS } from '@/src/api/auth/keys';
import { AuthResponse } from '@/src/api/auth/models';
import * as Burnt from 'burnt';
import { AxiosError } from 'axios';
import { USERS_KEYS } from '@/src/api/users/keys';

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: Api.users.existsByEmail,
    onSuccess: (exists, email) => {
      queryClient.setQueryData(['emailExists', email], exists)
    }
  })
}

export const useEditUser = () => {
  return useMutation({
    mutationFn: Api.users.editUser,
    mutationKey: USERS_KEYS.update,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(AUTH_KEYS.me, (prevData: AuthResponse) => {
        if(!prevData) return prevData;
        return {
          ...prevData,
          user: updatedUser
        }
      });
      Burnt.toast({
        preset: 'done',
        title: 'Данные успешно обновлены'
      });
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        Burnt.toast({
          preset: 'error',
          title: 'Произошла ошибка при обновлении данных'
        })
      }
    }
  })
}