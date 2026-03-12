import type { AdminStatisticsDto } from '@/api/admin/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type { UserListDto, UserFilter } from '@/api/users/model.ts';
import type { PageResponse } from '@/api/model.ts';

export const getStatistics = async (): Promise<AdminStatisticsDto> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/statistics`);
  return response.data;
}

export const findAllUsers = async (filter: UserFilter, sort?: string): Promise<PageResponse<UserListDto>> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/users`, {
    params: { ...filter, ...(sort ? { sort } : {}) },
  });
  return response.data;
}