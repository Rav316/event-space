import {
  ProfileStatisticsSkeleton,
  UserActivity,
  UserStatisticsBlock,
} from '@/components/shared';
import { Calendar, Clock, Trophy } from 'lucide-react';
import { useUserProfileStatistics } from '@/api/statistics/hooks.ts';

export const UserStatistics = () => {
  const { data: statistics, isPending: isStatisticsPending } =
    useUserProfileStatistics();

  if (isStatisticsPending || !statistics) {
    return <ProfileStatisticsSkeleton />;
  }

  return (
    <div className={'flex flex-col gap-5'}>
      <div className={'flex gap-5 max-[700px]:flex-col max-[700px]:gap-3'}>
        <UserStatisticsBlock
          title={'Создано событий'}
          Icon={Calendar}
          value={statistics.createdEvents}
          caption={'за всё время'}
        />
        <UserStatisticsBlock
          title={'Посещено событий'}
          Icon={Trophy}
          value={statistics.visitedEvents}
          caption={`из ${statistics.totalEvents} регистраций`}
        />
        <UserStatisticsBlock
          title={'Предстоящие'}
          Icon={Clock}
          value={statistics.upcomingEvents}
          caption={'в будущем'}
        />
      </div>
      <div
        className={
          'flex flex-col border border-[#E5E5E5] rounded-2xl p-5 gap-3 max-[500px]:p-3'
        }
      >
        <span>Последняя активность</span>
        <UserActivity />
        <UserActivity />
        <UserActivity />
      </div>
    </div>
  );
};
