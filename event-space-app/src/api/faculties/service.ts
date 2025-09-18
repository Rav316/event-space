import type { FacultyListDto } from '@/api/faculties/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';

export const findAll = async (): Promise<FacultyListDto[]> => {
  const response = await axiosInstance.get<FacultyListDto[]>(
    ApiRoutes.FACULTIES,
  );
  return response.data;
};
