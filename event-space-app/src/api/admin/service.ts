import type {
  AdminStatisticsDto,
  AdminListFilter,
  EventAdminListDto,
  ComplaintListDto,
  BuildingReadDto,
  EventCategoryReadDto,
  ProgramReadDto,
} from '@/api/admin/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type { UserAdminListDto } from '@/api/users/model.ts';
import type { SpaceListDto } from '@/api/spaces/model.ts';
import type { PageResponse } from '@/api/model.ts';

export const getStatistics = async (): Promise<AdminStatisticsDto> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/statistics`);
  return response.data;
};

export const findAllUsers = async (
  filter: AdminListFilter,
  sort?: string,
): Promise<PageResponse<UserAdminListDto>> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/users`, {
    params: { ...filter, ...(sort ? { sort } : {}) },
  });
  return response.data;
};

export const findAllEvents = async (
  filter: AdminListFilter,
  sort?: string,
): Promise<PageResponse<EventAdminListDto>> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/events`, {
    params: { ...filter, ...(sort ? { sort } : {}) },
  });
  return response.data;
};

export const findAllComplaints = async (
  filter: AdminListFilter,
  sort?: string,
): Promise<PageResponse<ComplaintListDto>> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/complaints`, {
    params: { ...filter, ...(sort ? { sort } : {}) },
  });
  return response.data;
};

export const findAllBuildings = async (
  filter: AdminListFilter,
  sort?: string,
): Promise<PageResponse<BuildingReadDto>> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/buildings`, {
    params: { ...filter, ...(sort ? { sort } : {}) },
  });
  return response.data;
};

export const findAllSpaces = async (
  filter: AdminListFilter,
  sort?: string,
): Promise<PageResponse<SpaceListDto>> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/spaces`, {
    params: { ...filter, ...(sort ? { sort } : {}) },
  });
  return response.data;
};

export const findAllCategories = async (
  filter: AdminListFilter,
  sort?: string,
): Promise<PageResponse<EventCategoryReadDto>> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/categories`, {
    params: { ...filter, ...(sort ? { sort } : {}) },
  });
  return response.data;
};

export const findAllPrograms = async (
  filter: AdminListFilter,
  sort?: string,
): Promise<PageResponse<ProgramReadDto>> => {
  const response = await axiosInstance.get(`${ApiRoutes.ADMIN}/programs`, {
    params: { ...filter, ...(sort ? { sort } : {}) },
  });
  return response.data;
};
