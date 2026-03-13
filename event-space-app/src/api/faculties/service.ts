import type { FacultyCreateDto, FacultyDeleteImpactDto, FacultyEditDto, FacultyListDto } from '@/api/faculties/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type { FacultyReadDto } from '@/api/admin/model.ts';

export const findAll = async (): Promise<FacultyListDto[]> => {
  const response = await axiosInstance.get<FacultyListDto[]>(
    ApiRoutes.FACULTIES,
  );
  return response.data;
};

export const existsByName = async (name: string): Promise<boolean> => {
  const response = await axiosInstance.get<boolean>(
    `${ApiRoutes.FACULTIES}/exists-by-name`,
    { params: { name } },
  );
  return response.data;
};

export const createFaculty = async (data: FacultyCreateDto): Promise<FacultyReadDto> => {
  const response = await axiosInstance.post<FacultyReadDto>(ApiRoutes.FACULTIES, data);
  return response.data;
};

export const editFaculty = async ({ id, data }: { id: number; data: FacultyEditDto }): Promise<FacultyReadDto> => {
  const response = await axiosInstance.put<FacultyReadDto>(`${ApiRoutes.FACULTIES}/${id}`, data);
  return response.data;
};

export const getDeleteImpact = async (id: number): Promise<FacultyDeleteImpactDto> => {
  const response = await axiosInstance.get<FacultyDeleteImpactDto>(
    `${ApiRoutes.FACULTIES}/${id}/delete-impact`,
  );
  return response.data;
};

export const deleteFaculty = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${ApiRoutes.FACULTIES}/${id}`);
};
