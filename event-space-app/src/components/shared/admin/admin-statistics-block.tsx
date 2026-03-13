import { StatisticsBlock } from '@/components/shared/statistics';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, TriangleAlert, Users } from 'lucide-react';
import { useAdminStatistics } from '@/api/admin/hooks.ts';


export const AdminStatisticsBlock = () => {
  const { data: statistics, isPending: isStatisticsPending } =
    useAdminStatistics();

  return (
    <div className={'flex items-center gap-3'}>
      <div
        className={
          'grid grid-cols-3 items-center gap-3 w-full max-[1300px]:grid-cols-2 max-[680px]:grid-cols-1'
        }
      >
        {isStatisticsPending ? (
          <>
            <Skeleton
              className={'rounded-2xl w-full min-w-[300px] h-[156px]'}
            />
            <Skeleton
              className={'rounded-2xl w-full min-w-[300px] h-[156px]'}
            />
            <Skeleton
              className={'rounded-2xl w-full min-w-[300px] h-[156px]'}
            />
          </>
        ) : (
          <>
            <StatisticsBlock
              title={'Всего пользователей'}
              Icon={Users}
              value={statistics?.totalUsers ?? 0}
              subtitle={`${statistics?.activeUsers ?? 0} активных`}
            />
            <StatisticsBlock
              title={'Мероприятий'}
              Icon={Calendar}
              value={statistics?.totalEvents ?? 0}
              subtitle={`${statistics?.activeEvents ?? 0} активных`}
            />
            <StatisticsBlock
              title={'Жалобы'}
              Icon={TriangleAlert}
              value={statistics?.pendingComplaints ?? 0}
              subtitle={'требуют рассмотрения'}
            />
          </>
        )}
      </div>
    </div>
  );
};
