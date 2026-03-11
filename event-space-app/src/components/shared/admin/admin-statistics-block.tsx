import { StatisticsBlock } from '@/components/shared/statistics';
import { Calendar, ChartColumn, TriangleAlert, Users } from 'lucide-react';

export const AdminStatisticsBlock = () => {
  return (
    <div className={'flex items-center gap-3'}>
      <div
        className={
          'grid grid-cols-4 items-center gap-3 w-full max-[1300px]:grid-cols-2 max-[680px]:grid-cols-1'
        }
      >
        <StatisticsBlock
          title={'Всего пользователей'}
          Icon={Users}
          value={2}
          delta={0}
        />
        <StatisticsBlock
          title={'Мероприятий'}
          Icon={Calendar}
          value={6}
          delta={0}
        />
        <StatisticsBlock
          title={'Жалобы'}
          Icon={TriangleAlert}
          value={2}
          delta={0}
          isPercent={true}
        />
        <StatisticsBlock
          title={'Активность'}
          Icon={ChartColumn}
          value={'100%'}
          delta={0}
        />
      </div>
    </div>
  );
};
