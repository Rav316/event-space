import type { AdminStatisticsDto, AdminListFilter, EventAdminListDto } from '@/api/admin/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type { UserAdminListDto } from '@/api/users/model.ts';
import type { PageResponse } from '@/api/model.ts';

export const getStatistics = async (): Promise<AdminStatisticsDto> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/statistics`);
  return response.data;
}

export const findAllUsers = async (filter: AdminListFilter, sort?: string): Promise<PageResponse<UserAdminListDto>> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/users`, {
    params: { ...filter, ...(sort ? { sort } : {}) },
  });
  return response.data;
}

export const findAllEvents = async (filter: AdminListFilter, sort?: string): Promise<PageResponse<EventAdminListDto>> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/events`, {
    params: { ...filter, ...(sort ? { sort } : {}) },
  });
  return response.data;
}