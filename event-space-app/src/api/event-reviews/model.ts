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

export interface EventReviewMyDto {
  id: number;
  event: number;
  title: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface EventReviewCreateEditDto {
  rating: number;
  title: string;
  content: string;
}

export interface EventReviewCreateEditData {
  eventId: number;
  review: EventReviewCreateEditDto;
}

export interface EventReviewStatisticsDto {
  avgRating: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
  total: number;
}

export interface EventReviewFilter {
  rating?: number;
  sort?: string;
}
