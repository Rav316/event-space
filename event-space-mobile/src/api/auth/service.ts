import { AuthResponse, UserLoginDto } from '@/src/api/auth/models';
import { axiosInstance } from '@/src/api/instance';
import { ApiRoutes } from '@/src/api/api-routes';

export const login = async (data: UserLoginDto): Promise<AuthResponse> => {
  const response = await axiosInstance.post(`${ApiRoutes.AUTH}/login`, data);
  return response.data;
};
