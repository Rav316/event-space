import type { UserAuthorDto } from '@/api/users/model.ts';

export interface EventReviewReadDto {
  id: number;
  author: UserAuthorDto;
  event: number;
  title: string;
  content: string;
  rating: number;
  createdAt: string;
}