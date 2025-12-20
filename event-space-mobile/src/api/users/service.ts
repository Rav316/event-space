import { UserEditData, UserReadDto } from '@/src/api/users/models';
import { axiosInstance } from '@/src/api/instance';
import { ApiRoutes } from '@/src/api/api-routes';

export const editUser = async (data: UserEditData): Promise<UserReadDto> => {
  const formData = new FormData();
  formData.append(
    'user',
    new Blob([JSON.stringify(data.user)], { type: 'application/json' })
  );
  if (data.avatar) {
    formData.append('avatar', data.avatar);
  }

  const response = await axiosInstance.put<UserReadDto>(
    `${ApiRoutes.USERS}/${data.userId}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  );

  return response.data;
};
