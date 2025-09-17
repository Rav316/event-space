import { useMutation, useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { queryClient } from '@/api/query-client.ts';
import { AUTH_KEYS } from '@/api/auth/keys.ts';
import { useAuthStore } from '@/store/use-auth-store.ts';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useLogin = () => {
  const setToken = useAuthStore(state => state.setToken)
  return useMutation({
    mutationFn: Api.auth.login,
    onSuccess: (data) => {
      toast.success('Вы успешно вошли в систему');
      setToken(data.accessToken);
      queryClient.setQueryData(AUTH_KEYS.me, data.user);
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