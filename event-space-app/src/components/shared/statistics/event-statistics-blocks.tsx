import { StatisticsBlock } from '@/components/shared/statistics/statistics-block.tsx';
import { Award, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui';
import { useUserStatistics } from '@/api/statistics/hooks.ts';

export const EventStatisticsBlocks = () => {
  const { data, isPending } = useUserStatistics();

  return (
    <div className={'flex items-center gap-3'}>
      {isPending || !data ? (
        <div
          className={
            'grid grid-cols-4 items-center gap-3 w-full max-[1300px]:grid-cols-2 max-[680px]:grid-cols-1'
          }
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className={'w-full h-[154px]'} />
          ))}
        </div>
      ) : (
        <div
          className={
            'grid grid-cols-4 items-center gap-3 w-full max-[1300px]:grid-cols-2 max-[680px]:grid-cols-1'
          }
        >
          <StatisticsBlock
            title={'Всего мероприятий'}
            Icon={Calendar}
            value={data.totalEvents}
            delta={data.monthlyEventsDelta}
          />
          <StatisticsBlock
            title={'Оставлено отзывов'}
            Icon={MessageSquare}
            value={data.reviewsLeft}
            delta={data.monthlyReviewsDelta}
          />
          <StatisticsBlock
            title={'Средняя посещаемость'}
            Icon={TrendingUp}
            value={`${(data.avgAttendance * 100).toFixed(2)}%`}
            delta={Number(data.monthlyAttendanceDelta.toFixed(4))}
            isPercent={true}
          />
          <StatisticsBlock
            title={'Средняя оценка отзывов'}
            Icon={Award}
            value={data.avgReviewRating.toFixed(2)}
            delta={data.avgRatingDelta}
          />
        </div>
      )}
    </div>
  );
};
