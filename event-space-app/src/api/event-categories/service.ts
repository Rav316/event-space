import type { EventCategory } from '@/api/event-categories/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';

export const findAll = async (): Promise<EventCategory[]> => {
  const response = await axiosInstance.get<EventCategory[]>(ApiRoutes.EVENT_CATEGORIES);
  return response.data;
}