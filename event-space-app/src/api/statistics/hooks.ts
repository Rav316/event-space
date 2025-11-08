import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { STATISTICS_KEYS } from '@/api/statistics/keys.ts';

export const useMyEventStatistics = () => {
  return useQuery({
    queryFn: Api.statistics.getMyEventStatistics,
    queryKey: STATISTICS_KEYS.statistics,
    refetchOnWindowFocus: false,
  });
};

export const useUserStatistics = () => {
  return useQuery({
    queryFn: Api.statistics.getUserStatistics,
    queryKey: STATISTICS_KEYS.detailsStatistics,
    refetchOnWindowFocus: false,
  });
};

export const useOverviewStatistics = () => {
  return useQuery({
    queryFn: Api.statistics.getOverviewStatistics,
    queryKey: STATISTICS_KEYS.overviewStatistics,
  });
};

export const useUserProfileStatistics = () => {
  return useQuery({
    queryFn: Api.statistics.getUserProfileStatistics,
    queryKey: STATISTICS_KEYS.profileStatistics,
    refetchOnWindowFocus: false,
  });
}

export const useReviewStatistics = () => {
  return useQuery({
    queryFn: Api.statistics.getReviewStatistics,
    queryKey: STATISTICS_KEYS.reviewsStatistics,
    refetchOnWindowFocus: false
  })
}

export const useCategoryStatistics = () => {
  return useQuery({
    queryFn: Api.statistics.getCategoryStatistics,
    queryKey: STATISTICS_KEYS.categoryStatistics,
    refetchOnWindowFocus: false
  })
}