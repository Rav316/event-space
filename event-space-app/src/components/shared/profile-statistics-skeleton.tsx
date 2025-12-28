import { Skeleton } from '@/components/ui';

export const ProfileStatisticsSkeleton = () => {
  return (
    <div className={'flex flex-col gap-5'}>
      <div className={'flex gap-5 max-[700px]:flex-col max-[700px]:gap-3'}>
        <Skeleton className={'w-full h-[144px]'} />
        <Skeleton className={'w-full h-[144px]'} />
        <Skeleton className={'w-full h-[144px]'} />
      </div>
      <Skeleton className={'w-full h-[300px]'} />
    </div>
  );
};
