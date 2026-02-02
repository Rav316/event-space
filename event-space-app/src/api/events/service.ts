import type {
  EventCalendarDto,
  EventCreateData,
  EventDetailsDto,
  EventEditData,
  EventFilter,
  EventListDto,
  EventListForUserDto,
  EventListMyDto,
  EventMyFilter,
  EventReadDto,
  EventRequestData,
  EventStep,
} from '@/api/events/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type { PageResponse, SliceResponse } from '@/api/model.ts';
import type {
  EventReviewCreateEditData,
  EventReviewFilter,
  EventReviewMyDto,
  EventReviewReadDto,
  EventReviewStatisticsDto,
} from '@/api/event-reviews/model.ts';

export const create = async (data: EventCreateData): Promise<void> => {
  const formData = new FormData();
  formData.append(
    'event',
    new Blob([JSON.stringify(data.event)], { type: 'application/json' }),
  );
  if (data.image) {
    formData.append('image', data.image);
  }

  await axiosInstance.post<void>(ApiRoutes.EVENTS, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const update = async (data: EventEditData): Promise<void> => {
  const formData = new FormData();
  formData.append(
    'event',
    new Blob([JSON.stringify(data.event)], { type: 'application/json' }),
  );
  if (data.image) {
    formData.append('image', data.image);
  }

  await axiosInstance.put<void>(
    `${ApiRoutes.EVENTS}/${data.eventId}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
};

export const findAllByFilter = async (
  requestData: EventRequestData<EventFilter>,
): Promise<PageResponse<EventListDto>> => {
  const response = await axiosInstance.get<PageResponse<EventListDto>>(
    ApiRoutes.EVENTS,
    { params: { ...requestData.filter, page: requestData.page } },
  );
  return response.data;
};

export const findAllMyEvents = async (
  requestData: EventRequestData<EventMyFilter>,
): Promise<PageResponse<EventListMyDto>> => {
  const response = await axiosInstance.get<PageResponse<EventListMyDto>>(
    `${ApiRoutes.EVENTS}/my`,
    { params: { ...requestData.filter, page: requestData.page } },
  );
  return response.data;
};

export const getActualEvents = async (): Promise<EventListDto[]> => {
  const response = await axiosInstance.get<EventListDto[]>(
    `${ApiRoutes.EVENTS}/actual`,
  );
  return response.data;
};

export const getMyUpcomingEvents = async (
  page: number,
): Promise<SliceResponse<EventListForUserDto>> => {
  const response = await axiosInstance.get<SliceResponse<EventListForUserDto>>(
    `${ApiRoutes.EVENTS}/my/upcoming`,
    { params: { page } },
  );
  return response.data;
};

export const getMyFinishedEvents = async (
  page: number,
): Promise<SliceResponse<EventListForUserDto>> => {
  const response = await axiosInstance.get<SliceResponse<EventListForUserDto>>(
    `${ApiRoutes.EVENTS}/my/finished`,
    { params: { page } },
  );
  return response.data;
};

export const findById = async (id: number): Promise<EventReadDto> => {
  const response = await axiosInstance.get<EventReadDto>(
    `${ApiRoutes.EVENTS}/${id}`,
  );
  return response.data;
};

export const findByIdWithDetails = async (
  id: number,
): Promise<EventDetailsDto> => {
  const response = await axiosInstance.get<EventDetailsDto>(
    `${ApiRoutes.EVENTS}/${id}/details`,
  );
  return response.data;
};

export const getStepsByEvent = async (
  eventId: number,
): Promise<EventStep[]> => {
  const response = await axiosInstance.get<EventStep[]>(
    `${ApiRoutes.EVENTS}/${eventId}/steps`,
  );
  return response.data;
};

export const getEventReviews = async (
  eventId: number,
  filter: EventReviewFilter,
  page: number,
): Promise<SliceResponse<EventReviewReadDto>> => {
  const response = await axiosInstance.get<SliceResponse<EventReviewReadDto>>(
    `${ApiRoutes.EVENTS}/${eventId}/reviews`,
    { params: { ...filter, page } },
  );
  return response.data;
};

export const getMyReviewByEvent = async (
  eventId: number,
): Promise<EventReviewMyDto> => {
  const response = await axiosInstance.get<EventReviewMyDto>(
    `${ApiRoutes.EVENTS}/${eventId}/reviews/my`,
  );
  return response.data;
};

export const addReviewForEvent = async (
  data: EventReviewCreateEditData,
): Promise<EventReviewReadDto> => {
  const response = await axiosInstance.post<EventReviewReadDto>(
    `${ApiRoutes.EVENTS}/${data.eventId}/reviews`,
    data.review,
  );
  return response.data;
};

export const editReviewForEvent = async (
  data: EventReviewCreateEditData,
): Promise<void> => {
  await axiosInstance.put<void>(
    `${ApiRoutes.EVENTS}/${data.eventId}/reviews`,
    data.review,
  );
};

export const deleteReviewForEvent = async (eventId: number): Promise<void> => {
  await axiosInstance.delete<void>(`${ApiRoutes.EVENTS}/${eventId}/reviews`);
};

export const getReviewsStatisticsByEvent = async (
  eventId: number,
): Promise<EventReviewStatisticsDto> => {
  const response = await axiosInstance.get<EventReviewStatisticsDto>(
    `${ApiRoutes.EVENTS}/${eventId}/reviews/statistics`,
  );
  return response.data;
};

export const findTagsStartWith = async (prefix: string): Promise<string[]> => {
  const response = await axiosInstance.get<string[]>(
    `${ApiRoutes.EVENTS}/tags/${prefix}`,
  );
  return response.data;
};

export const registerForEvent = async (eventId: number): Promise<void> => {
  const response = await axiosInstance.post<void>(
    `${ApiRoutes.EVENTS}/${eventId}/register`,
  );
  return response.data;
};

export const unregisterFromEvent = async (eventId: number): Promise<void> => {
  const response = await axiosInstance.delete<void>(
    `${ApiRoutes.EVENTS}/${eventId}/unregister`,
  );
  return response.data;
};

export const removeEvent = async (eventId: number): Promise<void> => {
  await axiosInstance.delete<void>(`${ApiRoutes.EVENTS}/${eventId}`);
};

export const getPopularEvents = async (): Promise<EventListDto[]> => {
  const response = await axiosInstance.get<EventListDto[]>(
    `${ApiRoutes.EVENTS}/popular`,
  );
  return response.data;
};

export const getEventsByMonth = async (
  year: number,
  month: number,
): Promise<EventCalendarDto[]> => {
  const response = await axiosInstance.get<EventCalendarDto[]>(
    `${ApiRoutes.EVENTS}/calendar`,
    { params: { year, month } },
  );
  return response.data;
};
