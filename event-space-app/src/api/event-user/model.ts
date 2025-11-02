export interface EventStatisticsDto {
  upcomingEventsCount: number;
  finishedEventsCount: number;
}

export interface UserStatisticsDto {
  totalEvents: number;
  reviewsLeft: number;
  avgAttendance: number;
  avgReviewRating: number;
  monthlyEventsDelta: number;
  monthlyReviewsDelta: number;
  monthlyAttendanceDelta: number;
  avgRatingDelta: number;
}