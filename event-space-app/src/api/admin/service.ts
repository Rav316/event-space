import type { AdminStatisticsDto } from '@/api/admin/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';

export const getStatistics = async (): Promise<AdminStatisticsDto> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/statistics`);
  return response.data;
}