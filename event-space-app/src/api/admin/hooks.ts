import { useQuery } from '@tanstack/react-query';
import { ADMIN_KEYS } from '@/api/admin/keys.ts';
import { Api } from '@/api/api-client.ts';

export const useAdminStatistics = () => {
  return useQuery({
    queryKey: [ADMIN_KEYS.STATISTICS],
    queryFn: () => Api.admin.getStatistics(),
  });
}