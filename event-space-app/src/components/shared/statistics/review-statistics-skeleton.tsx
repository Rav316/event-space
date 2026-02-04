import { Skeleton } from '@/components/ui';

export const ReviewStatisticsSkeleton = () => {
  return (
    <div className={'flex flex-col gap-5 w-full'}>
      <div className="flex items-stretch gap-5 w-full max-[1000px]:flex-col">
        <Skeleton className={'w-full h-[282px]'} />
        <Skeleton className={'w-full h-[282px]'} />
      </div>
    </div>
  );
};
