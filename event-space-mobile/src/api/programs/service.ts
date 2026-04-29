import { ProgramListDto } from '@/src/api/programs/models';
import { axiosInstance } from '@/src/api/instance';
import { ApiRoutes } from '@/src/api/api-routes';

export const findAll = async (): Promise<ProgramListDto[]> => {
  const response = await axiosInstance.get<ProgramListDto[]>(
    ApiRoutes.PROGRAMS
  );
  return response.data;
};
