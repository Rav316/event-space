import { Skeleton } from '@/components/ui';

export const LastReviewsListSkeleton = () => {
  return (
    <div
      className={
        'flex flex-col gap-5 w-full border border-[#E5E5E5] rounded-2xl p-5'
      }
    >
      <span className={'font-medium text-xl'}>Мои последние отзывы</span>

      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={
            'flex flex-col gap-2 border border-[#E5E5E5] rounded-2xl p-5 bg-[#F9F9F9]'
          }
        >
          <div className={'flex items-center gap-2 justify-between'}>
            <Skeleton className={'h-6 w-[200px]'} />
            <Skeleton className={'h-4 w-[100px]'} />
          </div>
          <div className={'flex items-center gap-2'}>
            <Skeleton className={'h-6 w-[100px]'} />
            <Skeleton className={'h-5 w-[120px]'} />
            <Skeleton className={'h-5 w-[140px]'} />
          </div>
          <Skeleton className={'h-16 w-full'} />
          <div className={'flex items-center gap-2 justify-between'}>
            <Skeleton className={'h-4 w-[100px]'} />
            <Skeleton className={'h-9 w-[160px]'} />
          </div>
        </div>
      ))}
    </div>
  );
};
