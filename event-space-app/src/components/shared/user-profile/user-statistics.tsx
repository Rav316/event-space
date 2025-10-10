import { UserActivity, UserStatisticsBlock } from '@/components/shared';
import { Calendar, Clock, Trophy } from 'lucide-react';

export const UserStatistics = () => {
  return (
    <div className={'flex flex-col gap-5'}>
      <div className={'flex gap-5'}>
        <UserStatisticsBlock
          title={'Создано событий'}
          Icon={Calendar}
          value={5}
          caption={'за всё время'}
        />
        <UserStatisticsBlock
          title={'Посещено событий'}
          Icon={Trophy}
          value={23}
          caption={'из 28 регистраций'}
        />
        <UserStatisticsBlock
          title={'Предстоящие'}
          Icon={Clock}
          value={3}
          caption={'за всё время'}
        />
      </div>
      <div className={'flex flex-col border border-[#E5E5E5] rounded-2xl p-5 gap-3'}>
        <span>Последняя активность</span>
        <UserActivity/>
        <UserActivity/>
        <UserActivity/>
      </div>
    </div>
  );
}