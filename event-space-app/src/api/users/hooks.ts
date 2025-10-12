import { useMutation } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { queryClient } from '@/api/query-client.ts';
import { AUTH_KEYS } from '@/api/auth/keys.ts';
import type { AuthResponse } from '@/api/auth/model.ts';

export const useEditUser = () => {
  return useMutation({
    mutationFn: Api.users.editUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(AUTH_KEYS.me, (prevData: AuthResponse) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          user: updatedUser
        };
      });
      toast.success('Данные успешно обновлены');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error('Произошла ошибка при обновлении данных');
      }
    },
  });
};
