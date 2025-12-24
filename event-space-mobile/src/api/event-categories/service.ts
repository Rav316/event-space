import { EventCategoryCountDto } from '@/src/api/event-categories/models';
import { axiosInstance } from '@/src/api/instance';
import { ApiRoutes } from '@/src/api/api-routes';

export const findAllWithEventCount = async (): Promise<EventCategoryCountDto[]> => {
  const response = await axiosInstance.get<EventCategoryCountDto[]>(
    `${ApiRoutes.EVENT_CATEGORIES}/with-event-count`
  );
  return response.data;
}