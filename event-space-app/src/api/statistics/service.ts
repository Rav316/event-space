import { axiosInstance } from '@/api/instance.ts';
import { ApiRoutes } from '@/api/api-routes.ts';
import type {
  EventStatisticsDto,
  OverviewStatisticsDto,
  UserStatisticsDto,
} from '@/api/statistics/model.ts';

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
