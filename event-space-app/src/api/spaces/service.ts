import type {
  SpaceFilter,
  SpaceListDto,
  SpaceType,
  SpaceCreateDto,
  SpaceEditDto,
  SpaceDeleteImpactDto,
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
  const response = await axiosInstance.get<SpaceType[]>(
    `${ApiRoutes.SPACES}/types`,
  );
  return response.data;
};

export const existsByNameAndBuilding = async (
  name: string,
  building: number,
): Promise<boolean> => {
  const response = await axiosInstance.get<boolean>(
    `${ApiRoutes.SPACES}/exists-by-name-and-building`,
    {
      params: { name, building },
    },
  );
  return response.data;
};

export const createSpace = async (
  data: SpaceCreateDto,
): Promise<SpaceListDto> => {
  const response = await axiosInstance.post<SpaceListDto>(
    ApiRoutes.SPACES,
    data,
  );
  return response.data;
};

export const editSpace = async ({
  id,
  data,
}: {
  id: number;
  data: SpaceEditDto;
}): Promise<SpaceListDto> => {
  const response = await axiosInstance.put<SpaceListDto>(
    `${ApiRoutes.SPACES}/${id}`,
    data,
  );
  return response.data;
};

export const getDeleteImpact = async (
  id: number,
): Promise<SpaceDeleteImpactDto> => {
  const response = await axiosInstance.get<SpaceDeleteImpactDto>(
    `${ApiRoutes.SPACES}/${id}/delete-impact`,
  );
  return response.data;
};

export const deleteSpace = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${ApiRoutes.SPACES}/${id}`);
};
