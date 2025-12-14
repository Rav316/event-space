import { axiosInstance } from '@/src/api/instance';
import { ApiRoutes } from '@/src/api/api-routes';

export const confirmAttendance = async (token: string): Promise<void> => {
  await axiosInstance.post(`${ApiRoutes.EVENTS}/confirm-attendance/${token}`);
}