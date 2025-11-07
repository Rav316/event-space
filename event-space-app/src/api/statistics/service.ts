import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type {
  EventStatisticsDto,
  OverviewStatisticsDto,
  UserProfileStatisticsDto,
  UserStatisticsDto,
} from '@/api/statistics/model.ts';
import type { EventReviewStatisticsDto } from '@/api/event-reviews/model.ts';

export const getMyEventStatistics = async (): Promise<EventStatisticsDto> => {
  const response = await axiosInstance.get<EventStatisticsDto>(
    `${ApiRoutes.STATISTICS}/events`,
  );
  return response.data;
};

export const getUserStatistics = async (): Promise<UserStatisticsDto> => {
  const response = await axiosInstance.get<UserStatisticsDto>(
    `${ApiRoutes.STATISTICS}/user`,
  );
  return response.data;
};

export const getOverviewStatistics =
  async (): Promise<OverviewStatisticsDto> => {
    const response = await axiosInstance.get<OverviewStatisticsDto>(
      `${ApiRoutes.STATISTICS}/overview`,
    );
    return response.data;
  };

export const getUserProfileStatistics =
  async (): Promise<UserProfileStatisticsDto> => {
    const response = await axiosInstance.get<UserProfileStatisticsDto>(
      `${ApiRoutes.STATISTICS}/profile`,
    );
    return response.data;
  };

export const getReviewStatistics =
  async (): Promise<EventReviewStatisticsDto> => {
    const response = await axiosInstance.get<EventReviewStatisticsDto>(
      `${ApiRoutes.STATISTICS}/reviews`,
    );
    return response.data;
  };
