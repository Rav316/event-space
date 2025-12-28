import { useMutation } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { queryClient } from '@/api/query-client.ts';
import { AUTH_KEYS } from '@/api/auth/keys.ts';
import type { AuthResponse } from '@/api/auth/model.ts';
import { useAuthStore } from '@/store/use-auth-store.ts';
import { useNavigate } from 'react-router';

export const useEditUser = () => {
  return useMutation({
    mutationFn: Api.users.editUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(AUTH_KEYS.me, (prevData: AuthResponse) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          user: updatedUser,
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

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: Api.users.existsByEmail,
    onSuccess: (exists, email) => {
      queryClient.setQueryData(['emailExists', email], exists);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: Api.users.changePassword,
    onSuccess: () => {
      toast.success('Пароль успешно изменен');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error('Неверный текущий пароль');
        } else {
          toast.error('Произошла ошибка при изменении пароля');
        }
      }
    },
  });
};

export const useDeleteAccount = () => {
  const removeToken = useAuthStore((state) => state.removeTokens);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: Api.users.deleteAccount,
    onSuccess: () => {
      toast.success('Аккаунт успешно удалён');
      navigate('/', { replace: true });
      setTimeout(() => {
        removeToken();
        queryClient.clear();
      }, 100);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error('Неверный текущий пароль');
          return;
        }
        toast.error('Произошла ошибка при удалении аккаунта');
      }
    },
  });
};
