import { UserEditData, UserReadDto } from '@/src/api/users/models';
import { axiosInstance } from '@/src/api/instance';
import { ApiRoutes } from '@/src/api/api-routes';

export const existsByEmail = async (email: string): Promise<boolean> => {
  const response = await axiosInstance.get<boolean>(
    `${ApiRoutes.USERS}/exists-by-email`,
    {
      params: {
        email
      }
    }
  );
  return response.data;
};

export const editUser = async (data: UserEditData): Promise<UserReadDto> => {
  const formData = new FormData();
  formData.append('user', {
    string: JSON.stringify(data.user),
    type: 'application/json'
  } as any);

  if (data.avatar) {
    formData.append('avatar', {
      uri: data.avatar.uri,
      type: data.avatar.mimeType ?? 'image/jpeg',
      name: data.avatar.fileName ?? data.avatar.uri.split('/').pop()
    } as any);
  }

  console.log(formData);

  const response = await axiosInstance.put<UserReadDto>(
    `${ApiRoutes.USERS}/${data.userId}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  );

  return response.data;
};
