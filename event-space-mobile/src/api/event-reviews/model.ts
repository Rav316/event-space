export interface EventReviewStatisticsDto {
  avgRating: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
  total: number;
}

export interface EventReviewReadDto {
  id: number;
  author: EventReviewAuthorDto;
  event: number;
  title: string;
  content: string;
  rating: number;
  helpfulMarks: number;
  userMarkedHelpful: boolean;
  createdAt: string;
}

export interface EventReviewAuthorDto {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface EventReviewFilter {
  rating?: number;
  sort?: string;
}
