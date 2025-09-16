import type { Role } from '@/api/auth/model.ts';
import type { FacultyAuthDto } from '@/api/faculty/model.ts';

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
  faculty: FacultyAuthDto;
}