import type { EventCategory } from '@/api/event-categories/model.ts';

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
  reviewsDynamicStatistics: ReviewsDynamicStatisticsDto[];
  reviewsAvgRatingStatistics: ReviewsAvgRatingStatisticsDto[];
}

export interface MontEventStatisticsDto {
  month: number;
  confirmedEventsCount: number;
}

export interface DayOfWeekStatisticsDto {
  dayOfWeek: number;
  attendedEventsCount: number;
}

export interface ReviewsDynamicStatisticsDto {
  month: number;
  reviewsCount: number;
}

export interface ReviewsAvgRatingStatisticsDto {
  month: number;
  rating: number;
}

export interface UserProfileStatisticsDto {
  createdEvents: number;
  visitedEvents: number;
  totalEvents: number;
  upcomingEvents: number;
}

export interface CategoryStatisticsDto {
  categoriesDistribution: CategoryDistributionDto[];
  categoriesActivity: CategoryActivityDto[];
}

export interface CategoryDistributionDto {
  category: EventCategory;
  count: number;
}

export interface CategoryActivityDto {
  category: EventCategory;
  activityPercent: number;
}