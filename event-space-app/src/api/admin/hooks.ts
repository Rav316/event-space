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

export const useBuildingsByFilter = (filter: AdminListFilter, sort?: string) => {
  return useQuery({
    queryKey: [ADMIN_KEYS.BUILDINGS, filter, sort],
    queryFn: () => Api.admin.findAllBuildings(filter, sort),
  });
}

export const useSpacesByFilter = (filter: AdminListFilter, sort?: string) => {
  return useQuery({
    queryKey: [ADMIN_KEYS.SPACES, filter, sort],
    queryFn: () => Api.admin.findAllSpaces(filter, sort),
  });
}

export const useCategoriesByFilter = (filter: AdminListFilter, sort?: string) => {
  return useQuery({
    queryKey: [ADMIN_KEYS.CATEGORIES, filter, sort],
    queryFn: () => Api.admin.findAllCategories(filter, sort),
  });
}

export const useFacultiesByFilter = (filter: AdminListFilter, sort?: string) => {
  return useQuery({
    queryKey: [ADMIN_KEYS.FACULTIES, filter, sort],
    queryFn: () => Api.admin.findAllFaculties(filter, sort),
  });
}