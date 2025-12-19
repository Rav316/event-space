import { FacultyListDto } from '@/src/api/faculties/models';
import { axiosInstance } from '@/src/api/instance';
import { ApiRoutes } from '@/src/api/api-routes';

export const findAll = async (): Promise<FacultyListDto[]> => {
  const response = await axiosInstance.get<FacultyListDto[]>(
    ApiRoutes.FACULTIES
  );
  return response.data;
};
