import { EventStatisticsBlock } from '@/components/shared/event-statistics/event-statistics-block.tsx';
import { Award, Calendar, TrendingUp, Users } from 'lucide-react';

export const EventStatisticsBlocks = () => {
  return (
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
        title={'Средняя оценка отзывов'}
        Icon={Award}
        value={'4.7'}
        percent={0}
      />
    </div>
  )
}