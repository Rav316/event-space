import { Skeleton } from '@/components/ui';
import { MessageSquare } from 'lucide-react';

export const EventReviewsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5">
      <div className="flex gap-4 items-center">
        <MessageSquare />
        <span>Отзывы участников</span>
      </div>
      <div className="flex items-center gap-4 mb-5">
        <div className="flex flex-col gap-3">
          <Skeleton className={'h-9 w-[116px]'} />
          <Skeleton className={'w-[116px] h-5'} />
          <Skeleton className={'h-6 w-full'} />
        </div>
        <div className="flex flex-col gap-3 w-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className={'h-4 w-full'} />
          ))}
        </div>
      </div>
    </div>
  );
};
