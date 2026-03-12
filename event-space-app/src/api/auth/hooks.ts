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

export const useRegistration = () => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const resetRegistrationData = useRegistrationStore(
    (state) => state.resetRegistrationData,
  );
  const navigate = useNavigate();
  return useMutation({
    mutationFn: Api.auth.register,
    onSuccess: (data) => {
      toast.success('Вы успешно зарегистрировались');
      setTokens(data.accessToken, data.refreshToken);
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
  const setTokens = useAuthStore((state) => state.setTokens);
  const setAuthModalOpen = useAuthModalStore((state) => state.setIsOpen);
  return useMutation({
    mutationFn: Api.auth.login,
    onSuccess: async (data) => {
      setAuthModalOpen(false);
      toast.success('Вы успешно вошли в систему');
      setTokens(data.accessToken, data.refreshToken);
      queryClient.setQueryData(AUTH_KEYS.me, data);
      queryClient.clear();
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

export const useMe = () => {
  const token = useAuthStore((s) => s.accessToken);
  const refreshToken = useAuthStore((s) => s.refreshToken);

  return useQuery({
    enabled: !!token,
    refetchOnWindowFocus: false,
    retry: false,
    queryKey: AUTH_KEYS.me,
    queryFn: () => Api.auth.refreshToken(refreshToken),
    staleTime: Infinity,
  });
};

export const useChangePassword = () => {
  const setTokens = useAuthStore((state) => state.setTokens);
  return useMutation({
    mutationFn: Api.auth.changePassword,
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
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
