import type { Building, BuildingCreateDto, BuildingEditDto, BuildingDeleteImpactDto } from '@/api/buildings/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';

export const findAll = async (): Promise<Building[]> => {
  const response = await axiosInstance.get<Building[]>(ApiRoutes.BUILDINGS);
  return response.data;
};

export const existsByName = async (name: string): Promise<boolean> => {
  const response = await axiosInstance.get<boolean>(`${ApiRoutes.BUILDINGS}/exists-by-name`, {
    params: { name },
  });
  return response.data;
};

export const createBuilding = async (data: BuildingCreateDto): Promise<Building> => {
  const response = await axiosInstance.post<Building>(ApiRoutes.BUILDINGS, data);
  return response.data;
};

export const editBuilding = async ({ id, data }: { id: number; data: BuildingEditDto }): Promise<Building> => {
  const response = await axiosInstance.put<Building>(`${ApiRoutes.BUILDINGS}/${id}`, data);
  return response.data;
};

export const getDeleteImpact = async (id: number): Promise<BuildingDeleteImpactDto> => {
  const response = await axiosInstance.get<BuildingDeleteImpactDto>(`${ApiRoutes.BUILDINGS}/${id}/delete-impact`);
  return response.data;
};

export const deleteBuilding = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${ApiRoutes.BUILDINGS}/${id}`);
};
