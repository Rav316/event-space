import { useMutation, useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { queryClient } from '@/api/query-client.ts';
import { AUTH_KEYS } from '@/api/auth/keys.ts';
import type { AuthResponse } from '@/api/auth/model.ts';
import { useAuthStore } from '@/store/use-auth-store.ts';
import { useNavigate } from 'react-router';
import { USERS_KEYS } from '@/api/users/keys.ts';
import { ADMIN_KEYS } from '@/api/admin/keys.ts';

export const useTopOrganizers = () => {
  return useQuery({
    queryFn: Api.users.getTopOrganizers,
    queryKey: USERS_KEYS.topOrganizers,
  });
};

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

export const useBlockUser = () => {
  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) =>
      Api.users.blockUser(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.USERS] });
      toast.success('Пользователь заблокирован');
    },
    onError: () => toast.error('Ошибка при блокировке пользователя'),
  });
};

export const useBlockUsers = () => {
  return useMutation({
    mutationFn: (userIds: number[]) => Api.users.blockUsers(userIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.USERS] });
      toast.success('Пользователи заблокированы');
    },
    onError: () => toast.error('Ошибка при блокировке пользователей'),
  });
};

export const useUnlockUser = () => {
  return useMutation({
    mutationFn: (id: number) => Api.users.unlockUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.USERS] });
      toast.success('Пользователь разблокирован');
    },
    onError: () => toast.error('Ошибка при разблокировке пользователя'),
  });
};

export const useChangeUserRole = () => {
  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: number }) =>
      Api.users.changeUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.USERS] });
      toast.success('Роль пользователя изменена');
    },
    onError: () => toast.error('Ошибка при изменении роли'),
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
