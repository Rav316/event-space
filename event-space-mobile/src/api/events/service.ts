import { axiosInstance } from '@/src/api/instance';
import { ApiRoutes } from '@/src/api/api-routes';
import { EventQrInfoDto } from '@/src/api/events/models';

export const confirmAttendance = async (
  token: string
): Promise<EventQrInfoDto> => {
  const response = await axiosInstance.post<EventQrInfoDto>(
    `${ApiRoutes.EVENTS}/confirm-attendance/${token}`
  );

  return response.data;
};
