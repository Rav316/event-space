import type {
  EventCreateData,
  EventListDto, EventRequestData
} from '@/api/events/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type { PageResponse } from '@/api/model.ts';

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
    { params: {...requestData.filter, page: requestData.page} },
  );
  return response.data;
};

export const getActualEvents = async (): Promise<EventListDto[]> => {
  const response = await axiosInstance.get<EventListDto[]>(
    `${ApiRoutes.EVENTS}/actual`,
  );
  return response.data;
};

export const findTagsStartWith = async (prefix: string): Promise<string[]> => {
  const response = await axiosInstance.get<string[]>(`${ApiRoutes.EVENTS}/tags/${prefix}`);
  return response.data;
}