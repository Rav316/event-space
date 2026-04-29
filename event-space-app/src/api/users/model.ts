import type { Role } from '@/api/auth/model.ts';
import type { ProgramListDto } from '@/api/programs/model.ts';

export interface UserReadDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  course: number;
  description: string;
  phone: string;
  avatarUrl: string;
  tgUsername: string;
  vkUrl: string;
  githubUrl: string;
  active: boolean;
  registerDate: Date;
  program: ProgramListDto;
  notificationCategoryIds: number[];
  emailNotificationsEnabled: boolean;
}

export interface UserRegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  program?: number;
  course?: number;
  password: string;
}

export interface UserEditDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  program: number;
  course?: number;
  description?: string;
  tgUsername?: string;
  vkUrl?: string;
  githubUrl?: string;
  notificationCategoryIds?: number[];
  emailNotificationsEnabled?: boolean;
}

export interface UserEditData {
  userId: number;
  user: UserEditDto;
  avatar: File | null;
  avatarRemoved: boolean;
}

export interface UserAuthorDto {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface UserEventAuthorDto extends UserAuthorDto {
  program: string;
}

export interface UserDeleteDto {
  currentPassword: string;
  confirmationPhrase: string;
}

export interface TopOrganizerDto {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  eventsCount: number;
}

export interface UserAdminListDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  course: number;
  program: ProgramListDto;
  active: boolean;
  avatarUrl: string;
}
