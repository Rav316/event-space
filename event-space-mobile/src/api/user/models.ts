import { FacultyListDto } from '@/src/api/faculties/models';

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