import eventExampleImage from '@/assets/event-example.jpg';
import eventExampleImage1 from '@/assets/event-example-alt.jpg';

import { EventCard } from '@/components/shared/event-card.tsx';
import * as React from 'react';
import { cn } from '@/lib/utils.ts';

interface Props {
  className?: string;
}

export const EventGroup: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        'grid grid-cols-3 max-[900px]:grid-cols-2 max-[528px]:grid-cols-1 gap-6',
      )}
    >
      <EventCard
        imageUrl={eventExampleImage}
        title={'Хакатон AI Challenge 2024'}
        description={
          'Соревнование по разработке AI-решений для студенческих проблем. Команды из 3-4 человек, 48 часов кодинга.'
        }
        date={'15 февраля'}
        time={'10:00 - 18:00'}
        location={'IT-корпус, аудитория 301'}
        registered={156}
        participants={200}
        author={'Проф. Иванов А.С.'}
        category={'IT-секции'}
      />
      <EventCard
        imageUrl={eventExampleImage1}
        title={'Турнир по баскетболу'}
        description={
          'Межфакультетный турнир по баскетболу среди студенческих команд. Регистрация до 22 февраля.'
        }
        date={'25 февраля'}
        time={'15:00 - 19:00'}
        location={'Спортивный комплекс'}
        registered={64}
        participants={80}
        author={'Проф. Иванов А.С.'}
        category={'Спортивные'}
      />
      <EventCard
        imageUrl={eventExampleImage}
        title={'Хакатон AI Challenge 2024'}
        description={
          'Соревнование по разработке AI-решений для студенческих проблем. Команды из 3-4 человек, 48 часов кодинга.'
        }
        date={'15 февраля'}
        time={'10:00 - 18:00'}
        location={'IT-корпус, аудитория 301'}
        registered={156}
        participants={200}
        author={'Проф. Иванов А.С.'}
        category={'IT-секции'}
      />
      <EventCard
        imageUrl={eventExampleImage1}
        title={'Турнир по баскетболу'}
        description={
          'Межфакультетный турнир по баскетболу среди студенческих команд. Регистрация до 22 февраля.'
        }
        date={'25 февраля'}
        time={'15:00 - 19:00'}
        location={'Спортивный комплекс'}
        registered={64}
        participants={80}
        author={'Проф. Иванов А.С.'}
        category={'Спортивные'}
      />
      <EventCard
        imageUrl={eventExampleImage}
        title={'Хакатон AI Challenge 2024'}
        description={
          'Соревнование по разработке AI-решений для студенческих проблем. Команды из 3-4 человек, 48 часов кодинга.'
        }
        date={'15 февраля'}
        time={'10:00 - 18:00'}
        location={'IT-корпус, аудитория 301'}
        registered={156}
        participants={200}
        author={'Проф. Иванов А.С.'}
        category={'IT-секции'}
      />
      <EventCard
        imageUrl={eventExampleImage1}
        title={'Турнир по баскетболу'}
        description={
          'Межфакультетный турнир по баскетболу среди студенческих команд. Регистрация до 22 февраля.'
        }
        date={'25 февраля'}
        time={'15:00 - 19:00'}
        location={'Спортивный комплекс'}
        registered={64}
        participants={80}
        author={'Проф. Иванов А.С.'}
        category={'Спортивные'}
      />
    </div>
  );
};
