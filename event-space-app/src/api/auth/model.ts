import type { UserReadDto } from '@/api/users/model.ts';

export const Roles = {
  ADMIN: 0,
  ORGANIZER: 1,
  PARTICIPANT: 2
} as const;

export type Role = typeof Roles[keyof typeof Roles];

export interface AuthResponse {
  user: UserReadDto;
  accessToken: string;
}