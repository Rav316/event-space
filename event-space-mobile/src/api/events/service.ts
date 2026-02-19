import { axiosInstance } from '@/src/api/instance';
import { ApiRoutes } from '@/src/api/api-routes';
import {
  EventListPreviewDto,
  EventPreviewFilter,
  EventQrInfoDto,
  EventReadDto,
  EventStep
} from '@/src/api/events/models';
import { SliceResponse } from '@/src/api/model';
import { EventReviewStatisticsDto, EventReviewFilter, EventReviewReadDto } from '@/src/api/event-reviews/model';

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

export const findById = async (id: number): Promise<EventReadDto> => {
  const response = await axiosInstance.get<EventReadDto>(
    `${ApiRoutes.EVENTS}/${id}`
  );
  return response.data;
};

export const getStepsByEvent = async (
  eventId: number
): Promise<EventStep[]> => {
  const response = await axiosInstance.get<EventStep[]>(
    `${ApiRoutes.EVENTS}/${eventId}/steps`
  );
  return response.data;
};

export const getEventReviews = async (
  eventId: number,
  filter: EventReviewFilter,
  page: number
): Promise<SliceResponse<EventReviewReadDto>> => {
  const response = await axiosInstance.get<SliceResponse<EventReviewReadDto>>(
    `${ApiRoutes.EVENTS}/${eventId}/reviews`,
    { params: { ...filter, page } }
  );
  return response.data;
};

export const getReviewsStatisticsByEvent = async (
  eventId: number
): Promise<EventReviewStatisticsDto> => {
  const response = await axiosInstance.get<EventReviewStatisticsDto>(
    `${ApiRoutes.EVENTS}/${eventId}/reviews/statistics`
  );
  return response.data;
};