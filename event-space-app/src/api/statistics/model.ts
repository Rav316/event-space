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

export interface EventStatisticsDto {
  upcomingEventsCount: number;
  finishedEventsCount: number;
}

export interface OverviewStatisticsDto {
  monthEventStatistics: MontEventStatisticsDto[];
  dayOfWeekStatistics: DayOfWeekStatisticsDto[];
  attendedEventsLastMonth: number;
  avgAttendedEventsPerUserLastMonth: number;
  reviewsLastMonth: number;
  avgReviewsPerUserLastMonth: number;
  avgRating: number;
  avgRatingSystem: number;
}

export interface MontEventStatisticsDto {
  month: number;
  confirmedEventsCount: number;
}

export interface DayOfWeekStatisticsDto {
  dayOfWeek: number;
  attendedEventsCount: number;
}