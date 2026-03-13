import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type {
  TopOrganizerDto,
  UserDeleteDto,
  UserEditData,
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

export const deleteAccount = async (data: UserDeleteDto): Promise<void> => {
  await axiosInstance.post<void>(`${ApiRoutes.USERS}/profile/delete`, data);
};

export const getTopOrganizers = async (): Promise<TopOrganizerDto[]> => {
  const response = await axiosInstance.get<TopOrganizerDto[]>(
    `${ApiRoutes.USERS}/top-organizers`,
  );
  return response.data;
};

export const blockUser = async (id: number, reason: string): Promise<void> => {
  await axiosInstance.post(`${ApiRoutes.USERS}/${id}/block`, { reason });
};

export const blockUsers = async (userIds: number[]): Promise<void> => {
  await axiosInstance.put(`${ApiRoutes.USERS}/block`, userIds);
};

export const unlockUser = async (id: number): Promise<void> => {
  await axiosInstance.post(`${ApiRoutes.USERS}/${id}/unlcok`);
};
