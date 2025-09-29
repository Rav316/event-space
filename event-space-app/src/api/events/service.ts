import type { EventCreateData } from '@/api/events/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';

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
