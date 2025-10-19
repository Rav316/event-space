import type { SpaceFilter, SpaceListDto } from '@/api/spaces/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';

export const findAllByFilter = async (
  filter: SpaceFilter,
): Promise<SpaceListDto[]> => {
  const response = await axiosInstance.get<SpaceListDto[]>(ApiRoutes.SPACES, {
    params: {
      ...filter,
    },
  });
  return response.data;
};
