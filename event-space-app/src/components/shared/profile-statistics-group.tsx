import { ProfileStatisticsBlock } from '@/components/shared/profile-statistics-block.tsx';
import { useUserProfileStatistics } from '@/api/statistics/hooks.ts';
import { Calendar, Clock, Trophy } from 'lucide-react';
import { Skeleton } from '@/components/ui';

export const ProfileStatisticsGroup = () => {
  const { data: statistics, isPending: isStatisticsPending } =
    useUserProfileStatistics();

  return (
    <>
      {isStatisticsPending || !statistics ? (
        <div
          className={
            'flex flex-col gap-2 max-[800px]:flex-row max-[615px]:flex-col'
          }
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className={'rounded-2xl gap-3 max-[800px]:flex-1'}
            >
              <div className={'h-14 max-[615px]:h-12'} />
            </Skeleton>
          ))}
        </div>
      ) : (
        <div
          className={
            'flex flex-col gap-2 max-[800px]:flex-row max-[615px]:flex-col'
          }
        >
          <ProfileStatisticsBlock
            className={'bg-gray-200'}
            title={'Создано событий'}
            Icon={Calendar}
            value={statistics.createdEvents}
          />
          <ProfileStatisticsBlock
            className={'bg-orange-100'}
            iconClassName={'text-orange-500'}
            title={'Посещено событий'}
            Icon={Trophy}
            value={`${statistics.visitedEvents}/${statistics.visitedEvents}`}
          />
          <ProfileStatisticsBlock
            className={'bg-blue-100'}
            iconClassName={'text-blue-500'}
            title={'Предстоящие'}
            Icon={Clock}
            value={statistics.upcomingEvents}
          />
        </div>
      )}
    </>
  );
};
