import { Skeleton } from '@/components/ui';

export const OverviewTabSkeleton = () => {
  return (
    <div className={'flex flex-col gap-5 w-full'}>
      <div className={'flex items-center gap-5 w-full max-[900px]:flex-col'}>
        <Skeleton className={'w-full h-[398px]'} />
        <Skeleton className={'w-full h-[398px]'} />
      </div>
      <Skeleton className={'w-full h-[194px]'} />
      <div className={'flex items-center gap-5 w-full max-[900px]:flex-col'}>
        <Skeleton className={'w-full h-[398px]'} />
        <Skeleton className={'w-full h-[398px]'} />
      </div>
    </div>
  );
};
