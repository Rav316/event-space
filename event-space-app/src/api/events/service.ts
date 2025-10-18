import type {
  EventCreateData,
  EventListDto,
  EventReadDto,
  EventRequestData,
  EventStep,
} from '@/api/events/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type { PageResponse, SliceResponse } from '@/api/model.ts';
import type { EventReviewReadDto } from '@/api/event-reviews/model.ts';

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

export const findAllByFilter = async (
  requestData: EventRequestData,
): Promise<PageResponse<EventListDto>> => {
  const response = await axiosInstance.get<PageResponse<EventListDto>>(
    ApiRoutes.EVENTS,
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

export const findById = async (id: number): Promise<EventReadDto> => {
  const response = await axiosInstance.get<EventReadDto>(
    `${ApiRoutes.EVENTS}/${id}`,
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
): Promise<SliceResponse<EventReviewReadDto>> => {
  const response = await axiosInstance.get<SliceResponse<EventReviewReadDto>>(
    `${ApiRoutes.EVENTS}/${eventId}/reviews`,
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
