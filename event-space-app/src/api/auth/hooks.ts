import { useMutation, useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { queryClient } from '@/api/query-client.ts';
import { AUTH_KEYS } from '@/api/auth/keys.ts';
import { useAuthStore } from '@/store/use-auth-store.ts';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { useRegistrationStore } from '@/store/use-registration-store.ts';
import { useAuthModalStore } from '@/store/use-auth-modal-store.ts';
import {
  showLogoutError,
  showLogoutLoading,
  showLogoutSuccess,
} from '@/components/shared/toast-logout';

export const useRegistration = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const resetRegistrationData = useRegistrationStore(
    (state) => state.resetRegistrationData,
  );
  const navigate = useNavigate();
  return useMutation({
    mutationFn: Api.auth.register,
    onSuccess: (data) => {
      toast.success('Вы успешно зарегистрировались');
      setToken(data.accessToken);
      queryClient.setQueryData(AUTH_KEYS.me, data);
      navigate('/');
      resetRegistrationData();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast.error('Пользователь с таким email уже существует');
        } else {
          toast.error('Произошла ошибка при регистрации');
        }
      }
    },
  });
};

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setAuthModalOpen = useAuthModalStore((state) => state.setIsOpen);
  return useMutation({
    mutationFn: Api.auth.login,
    onSuccess: async (data) => {
      setAuthModalOpen(false);
      toast.success('Вы успешно вошли в систему');
      setToken(data.accessToken);
      queryClient.setQueryData(AUTH_KEYS.me, data);
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'events',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error('Неверный email или пароль');
        } else {
          toast.error('Произошла ошибка при входе в систему');
        }
      }
    },
  });
};

export const useLogout = () => {
  const removeToken = useAuthStore((state) => state.removeToken);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: Api.auth.logout,

    onMutate: () => {
      const toastId = showLogoutLoading();
      return { toastId };
    },

    onSuccess: (_, __, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);

      navigate('/', { replace: true });
      setTimeout(() => {
        removeToken();
        queryClient.clear();
      }, 100);

      showLogoutSuccess();
    },

    onError: (error, _, context) => {
      if (context?.toastId) toast.dismiss(context.toastId);
      if (error instanceof AxiosError) {
        showLogoutError();
      }
    },
  });
};

export const useMe = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    enabled: !!token,
    refetchOnWindowFocus: false,
    retry: false,
    queryKey: AUTH_KEYS.me,
    queryFn: Api.auth.refreshToken,
    staleTime: Infinity,
  });
};
