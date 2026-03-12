import type {
  ComplaintCreateDto,
  ComplaintType,
} from '@/api/complaint/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';

export const findAllComplaintTypes = async (): Promise<ComplaintType[]> => {
  const response = await axiosInstance.get<ComplaintType[]>(`${ApiRoutes.COMPLAINTS}/types`);
  return response.data;
};

export const createComplaint = async (dto: ComplaintCreateDto): Promise<void> => {
  await axiosInstance.post(`${ApiRoutes.COMPLAINTS}`, dto);
};