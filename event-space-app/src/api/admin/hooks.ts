import { useQuery } from '@tanstack/react-query';
import { ADMIN_KEYS } from '@/api/admin/keys.ts';
import { Api } from '@/api/api-client.ts';
import type { AdminListFilter } from '@/api/admin/model.ts';

export const useAdminStatistics = () => {
  return useQuery({
    queryKey: [ADMIN_KEYS.STATISTICS],
    queryFn: () => Api.admin.getStatistics(),
  });
}

export const useUsersByFilter = (filter: AdminListFilter, sort?: string) => {
  return useQuery({
    queryKey: [ADMIN_KEYS.USERS, filter, sort],
    queryFn: () => Api.admin.findAllUsers(filter, sort),
  });
}

export const useEventsByFilter = (filter: AdminListFilter, sort?: string) => {
  return useQuery({
    queryKey: [ADMIN_KEYS.EVENTS, filter, sort],
    queryFn: () => Api.admin.findAllEvents(filter, sort),
  });
}

export const useComplaintsByFilter = (filter: AdminListFilter, sort?: string) => {
  return useQuery({
    queryKey: [ADMIN_KEYS.COMPLAINTS, filter, sort],
    queryFn: () => Api.admin.findAllComplaints(filter, sort),
  });
}