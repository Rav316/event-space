import { Skeleton } from '@/components/ui';

export const CategoriesStatisticsSkeleton = () => {
  return (
    <div className={'flex flex-col gap-5'}>
      <div className={'flex items-center gap-5'}>
        <Skeleton className={'w-full h-[430px]'} />
        <Skeleton className={'w-full h-[430px]'} />
      </div>
    </div>
  );
};
