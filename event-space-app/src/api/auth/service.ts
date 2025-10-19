import type { AuthResponse } from '@/api/auth/model.ts';
import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type { LoginData } from '@/schemas/form-login-schema.ts';
import type { UserRegisterDto } from '@/api/users/model.ts';

export const register = async (
  registerData: UserRegisterDto,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    `${ApiRoutes.AUTH}/register`,
    registerData,
  );
  return response.data;
};

export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    `${ApiRoutes.AUTH}/login`,
    loginData,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const refreshToken = async (): Promise<AuthResponse> => {
  console.log('refresh query');
  const response = await axiosInstance.put<AuthResponse>(
    `${ApiRoutes.AUTH}/refresh-token`,
    {},
    { withCredentials: true },
  );
  return response.data;
};

export const logout = async (): Promise<void> => {
  const response = await axiosInstance.post<void>(`${ApiRoutes.AUTH}/logout`);
  return response.data;
};
