import { useQuery } from '@tanstack/react-query';
import { ADMIN_KEYS } from '@/api/admin/keys.ts';
import { Api } from '@/api/api-client.ts';
import type { UserFilter } from '@/api/users/model.ts';

export const useAdminStatistics = () => {
  return useQuery({
    queryKey: [ADMIN_KEYS.STATISTICS],
    queryFn: () => Api.admin.getStatistics(),
  });
}

export const useUsersByFilter = (filter: UserFilter, sort?: string) => {
  return useQuery({
    queryKey: [ADMIN_KEYS.USERS, filter, sort],
    queryFn: () => Api.admin.findAllUsers(filter, sort),
  });
}