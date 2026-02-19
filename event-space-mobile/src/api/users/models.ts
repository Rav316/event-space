import { FacultyListDto } from '@/src/api/faculties/models';
import { ImagePickerAsset } from 'expo-image-picker';

export interface UserReadDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  course: number;
  description: string;
  phone: string;
  avatarUrl: string;
  tgUsername: string;
  vkUrl: string;
  githubUrl: string;
  active: boolean;
  registerDate: Date;
  faculty: FacultyListDto;
}

export interface UserEditDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  faculty: number;
  course?: number;
  description?: string;
  tgUsername?: string;
  vkUrl?: string;
  githubUrl?: string;
}

export interface UserEditData {
  userId: number;
  user: UserEditDto;
  avatar: ImagePickerAsset | null;
  avatarRemoved: boolean;
}

export interface UserAuthorDto {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface UserEventAuthorDto extends UserAuthorDto {
  faculty: string;
}