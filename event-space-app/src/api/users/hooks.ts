import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { USERS_KEYS } from '@/api/users/keys.ts';

export const useExistsByEmail = (email: string, enabled?: boolean) => {
  return useQuery({
    queryKey: [...USERS_KEYS.checkEmail, email],
    queryFn: () => Api.users.existsByEmail(email),
    enabled,
  });
};
