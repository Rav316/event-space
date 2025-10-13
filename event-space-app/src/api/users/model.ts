import type { Role } from '@/api/auth/model.ts';
import type { FacultyListDto } from '@/api/faculties/model.ts';

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
  faculty: FacultyListDto;
}

export interface UserRegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  faculty?: number;
  course?: number;
  password: string;
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
  avatar: File | null;
}

export interface UserPasswordChangeDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}