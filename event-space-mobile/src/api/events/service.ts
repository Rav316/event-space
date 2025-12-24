import { axiosInstance } from '@/src/api/instance';
import { ApiRoutes } from '@/src/api/api-routes';
import {
  EventListPreviewDto,
  EventPreviewFilter,
  EventQrInfoDto
} from '@/src/api/events/models';
import { SliceResponse } from '@/src/api/model';

export const confirmAttendance = async (
  token: string
): Promise<EventQrInfoDto> => {
  const response = await axiosInstance.post<EventQrInfoDto>(
    `${ApiRoutes.EVENTS}/confirm-attendance/${token}`
  );

  return response.data;
};

export const findAllByFilter = async (
  filter: EventPreviewFilter,
  page: number
): Promise<SliceResponse<EventListPreviewDto>> => {
  const response = await axiosInstance.get<SliceResponse<EventListPreviewDto>>(
    `${ApiRoutes.EVENTS}/preview`,
    { params: { ...filter, page } }
  );
  return response.data;
};
