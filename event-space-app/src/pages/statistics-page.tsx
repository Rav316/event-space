import { Wrapper } from '@/components/hoc';
import { EventStatisticsBlock } from '@/components/shared/event-statistics';
import { Award, Calendar, TrendingUp, Users } from 'lucide-react';

const StatisticsPage = () => {
  return (
    <Wrapper className={'flex flex-col gap-y-3 py-5 mt-5'}>
      <h1 className={'text-3xl font-medium'}>Статистика мероприятий</h1>
      <span className={'text-muted-foreground'}>
        Анализ посещаемости и эффективности мероприятий
      </span>
      <div className={'flex items-center gap-3'}>
        <EventStatisticsBlock
          title={'Всего мероприятий'}
          Icon={Calendar}
          value={'148'}
          percent={12}
        />
        <EventStatisticsBlock
          title={'Общее количество посетителей'}
          Icon={Users}
          value={'4,163'}
          percent={25}
        />
        <EventStatisticsBlock
          title={'Средняя посещаемость'}
          Icon={TrendingUp}
          value={'82%'}
          percent={-15}
        />
        <EventStatisticsBlock
          title={'Средний рейтинг'}
          Icon={Award}
          value={'4.7'}
          percent={0}
        />
      </div>
    </Wrapper>
  );
};

export default StatisticsPage;