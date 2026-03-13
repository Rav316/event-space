import type {
  EventCategory,
  EventCategoryCountDto,
  EventCategoryCreateDto,
  EventCategoryDeleteImpactDto,
  EventCategoryEditDto,
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

export const existsByName = async (name: string): Promise<boolean> => {
  const response = await axiosInstance.get<boolean>(
    `${ApiRoutes.EVENT_CATEGORIES}/exists-by-name`,
    { params: { name } },
  );
  return response.data;
};

export const createCategory = async (
  data: EventCategoryCreateDto,
): Promise<EventCategory> => {
  const response = await axiosInstance.post<EventCategory>(
    ApiRoutes.EVENT_CATEGORIES,
    data,
  );
  return response.data;
};

export const editCategory = async ({
  id,
  data,
}: {
  id: number;
  data: EventCategoryEditDto;
}): Promise<EventCategory> => {
  const response = await axiosInstance.put<EventCategory>(
    `${ApiRoutes.EVENT_CATEGORIES}/${id}`,
    data,
  );
  return response.data;
};

export const getDeleteImpact = async (
  id: number,
): Promise<EventCategoryDeleteImpactDto> => {
  const response = await axiosInstance.get<EventCategoryDeleteImpactDto>(
    `${ApiRoutes.EVENT_CATEGORIES}/${id}/delete-impact`,
  );
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${ApiRoutes.EVENT_CATEGORIES}/${id}`);
};
