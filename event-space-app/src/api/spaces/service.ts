import type {
  SpaceFilter,
  SpaceListDto,
  SpaceType,
} from '@/api/spaces/model.ts';
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

export const findAllSpaceTypes = async (): Promise<SpaceType[]> => {
  const response = await axiosInstance.get<SpaceType[]>(ApiRoutes.SPACE_TYPES);
  return response.data;
};