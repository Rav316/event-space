import { CategoriesDistributionBlock } from '@/components/shared/statistics/categories-distribution-block.tsx';
import { CategoriesActivityBlock } from '@/components/shared/statistics/categories-activity-block.tsx';
import { useCategoryStatistics } from '@/api/statistics/hooks.ts';
import { CategoriesStatisticsSkeleton } from '@/components/shared/statistics/categories-statistics-skeleton.tsx';

export const CategoriesStatisticsTab = () => {
  const { data: statistics, isPending: isStatisticsPending } =
    useCategoryStatistics();

  return (
    <>
      {isStatisticsPending || !statistics ? (
        <CategoriesStatisticsSkeleton />
      ) : (
        <div className={'flex flex-col gap-5'}>
          <div className={'flex items-center gap-5'}>
            <CategoriesDistributionBlock
              categoriesDistribution={statistics.categoriesDistribution}
            />
            <CategoriesActivityBlock
              categoriesActivity={statistics.categoriesActivity}
            />
          </div>
        </div>
      )}
    </>
  );
};
