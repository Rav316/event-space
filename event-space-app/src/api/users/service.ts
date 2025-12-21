import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type {
  UserDeleteDto,
  UserEditData,
  UserPasswordChangeDto,
  UserReadDto,
} from '@/api/users/model.ts';

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

export const editUser = async (data: UserEditData): Promise<UserReadDto> => {
  const formData = new FormData();
  formData.append(
    'user',
    new Blob([JSON.stringify(data.user)], { type: 'application/json' }),
  );
  if (!data.avatarRemoved && data.avatar) {
    formData.append('avatar', data.avatar);
  }
  formData.append(
    'avatarRemoved',
    new Blob([data.avatarRemoved.toString()], { type: 'application/json' }),
  );

  const response = await axiosInstance.put<UserReadDto>(
    `${ApiRoutes.USERS}/${data.userId}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  return response.data;
};

export const changePassword = async (
  data: UserPasswordChangeDto,
): Promise<void> => {
  await axiosInstance.patch<void>(
    `${ApiRoutes.USERS}/profile/change-password`,
    data,
  );
};

export const deleteAccount = async (data: UserDeleteDto): Promise<void> => {
  await axiosInstance.post<void>(`${ApiRoutes.USERS}/profile/delete`, data);
};
