import type {
  ProgramCreateDto,
  ProgramDeleteImpactDto,
  ProgramEditDto,
  ProgramListDto,
} from '@/api/programs/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type { ProgramReadDto } from '@/api/admin/model.ts';

export const findAll = async (): Promise<ProgramListDto[]> => {
  const response = await axiosInstance.get<ProgramListDto[]>(
    ApiRoutes.PROGRAMS,
  );
  return response.data;
};

export const existsByName = async (name: string): Promise<boolean> => {
  const response = await axiosInstance.get<boolean>(
    `${ApiRoutes.PROGRAMS}/exists-by-name`,
    { params: { name } },
  );
  return response.data;
};

export const createProgram = async (
  data: ProgramCreateDto,
): Promise<ProgramReadDto> => {
  const response = await axiosInstance.post<ProgramReadDto>(
    ApiRoutes.PROGRAMS,
    data,
  );
  return response.data;
};

export const editProgram = async ({
  id,
  data,
}: {
  id: number;
  data: ProgramEditDto;
}): Promise<ProgramReadDto> => {
  const response = await axiosInstance.put<ProgramReadDto>(
    `${ApiRoutes.PROGRAMS}/${id}`,
    data,
  );
  return response.data;
};

export const getDeleteImpact = async (
  id: number,
): Promise<ProgramDeleteImpactDto> => {
  const response = await axiosInstance.get<ProgramDeleteImpactDto>(
    `${ApiRoutes.PROGRAMS}/${id}/delete-impact`,
  );
  return response.data;
};

export const deleteProgram = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${ApiRoutes.PROGRAMS}/${id}`);
};
