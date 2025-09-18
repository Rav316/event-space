import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';

export const existsByEmail = async (email: string): Promise<boolean> => {
  const response = await axiosInstance.get<boolean>(
    `${ApiRoutes.USERS}/exists-by-email`,
    {
      params: {
        email,
      },
    },
  );
  return response.data;
};
