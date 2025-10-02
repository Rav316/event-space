import type {
  EventCategory,
  EventCategoryCountDto,
} from '@/api/event-categories/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';

export const findAll = async (): Promise<EventCategory[]> => {
  const response = await axiosInstance.get<EventCategory[]>(
    ApiRoutes.EVENT_CATEGORIES,
  );
  return response.data;
};

export const findAllWithEventCount = async (): Promise<
  EventCategoryCountDto[]
> => {
  const response = await axiosInstance.get<EventCategoryCountDto[]>(
    `${ApiRoutes.EVENT_CATEGORIES}/with-event-count`,
  );
  return response.data;
};
