import type { SpaceType } from '@/api/space-types/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';

export const findAll = async (): Promise<SpaceType[]> => {
  const response = await axiosInstance.get<SpaceType[]>(ApiRoutes.SPACE_TYPES);
  return response.data;
}