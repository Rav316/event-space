import { CategoriesDistributionBlock } from '@/components/shared/event-statistics/categories-distribution-block.tsx';
import { CategoriesActivityBlock } from '@/components/shared/event-statistics/categories-activity-block.tsx';

export const CategoriesStatisticsTab = () => {
  return (
    <div className={'flex flex-col gap-5'}>
      <div className={'flex items-center gap-5'}>
        <CategoriesDistributionBlock />
        <CategoriesActivityBlock />
      </div>
    </div>
  );
};
