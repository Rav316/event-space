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
  const setToken = useAuthStore(state => state.setToken);
  const resetRegistrationData = useRegistrationStore(state => state.resetRegistrationData);
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
      if(error instanceof AxiosError) {
        if(error.response?.status === 409) {
          toast.error('Пользователь с таким email уже существует');
        } else {
          toast.error('Произошла ошибка при регистрации');
        }
      }
    }
  })
}

export const useLogin = () => {
  const setToken = useAuthStore(state => state.setToken);
  const setAuthModalOpen = useAuthModalStore(state => state.setIsOpen);
  return useMutation({
    mutationFn: Api.auth.login,
    onSuccess: (data) => {
      setAuthModalOpen(false)
      toast.success('Вы успешно вошли в систему');
      setToken(data.accessToken);
      queryClient.setQueryData(AUTH_KEYS.me, data);
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        if(error.response?.status === 403) {
          toast.error('Неверный email или пароль');
        } else {
          toast.error('Произошла ошибка при входе в систему');
        }
      }
    }
  })
}

export const useLogout = () => {
  const removeToken = useAuthStore((state) => state.removeToken);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: Api.auth.logout,
    onSuccess: () => {
      navigate('/', {replace: true});
      setTimeout(() => {
        removeToken();
        queryClient.clear();
      }, 100);
      toast.success('Вы успешно вышли из системы');
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        toast.error('Произошла ошибка при выходе из системы');
      }
    }
  })
}

export const useMe = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    enabled: !!token,
    refetchOnWindowFocus: false,
    retry: false,
    queryKey: AUTH_KEYS.me,
    queryFn: Api.auth.refreshToken,
    staleTime: Infinity
  })
}