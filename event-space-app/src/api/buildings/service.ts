import type { Building } from '@/api/buildings/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';

export const findAll = async (): Promise<Building[]> => {
  const response = await axiosInstance.get<Building[]>(ApiRoutes.BUILDINGS);
  return response.data;
}