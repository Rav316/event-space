import { UserReadDto } from '@/src/api/users/models';

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: UserReadDto;
  accessToken: string;
  refreshToken: string;
}