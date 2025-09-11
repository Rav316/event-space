import eventExampleImage from '@/assets/event-example.jpg';
import { EventCardLabel } from '@/components/shared/event-card-label.tsx';
import { Calendar, Clock4, MapPin, Users } from 'lucide-react';
import { Badge, Button } from '@/components/ui';

export const EventCard = () => {
  return (
    <div
      className={
        'relative min-h-[350px] flex flex-col rounded-3xl border border-[#E5E5E5] shadow-md hover:translate-y-[-3px] transition-all duration-300 hover:shadow-lg'
      }
    >
      <div className="absolute z-10 top-3 left-3">
        <Badge className={'bg-orange-100 text-orange-900'}>IT-секции</Badge>
      </div>
      <div className="overflow-hidden rounded-t-lg">
        <img
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          src={eventExampleImage}
          alt="event example image"
        />
      </div>
      <div className={'flex flex-col p-[21px]'}>
        <div className={'pb-[21px] flex flex-col gap-y-3'}>
          <span className={'font-medium'}>Хакатон AI Challenge 2024</span>
          <p className={'text-muted-foreground line-clamp-3'}>
            Соревнование по разработке AI-решений для студенческих проблем.
            Команды из 3-4 человек, 48 часов кодинга.
          </p>
          <div className={'flex flex-col gap-y-2'}>
            <div
              className={
                'flex min-[1000px]:items-center min-[1000px]:gap-5 max-[1000px]:flex-col max-[1000px]:gap-y-2'
              }
            >
              <EventCardLabel Icon={Calendar} text={'15 февраля'} />
              <EventCardLabel Icon={Clock4} text={'10:00 - 18:00'} />
            </div>
            <EventCardLabel Icon={MapPin} text={'IT-корпус, аудитория 301'} />
            <div
              className={
                'flex min-[1000px]:items-center min-[1000px]:gap-5 max-[1000px]:flex-col max-[1000px]:gap-y-2'
              }
            >
              <EventCardLabel Icon={Users} text={'156/200 участников'} />
              <span className={'text-muted-foreground'}>
                Автор: Проф. Иванов А.С.
              </span>
            </div>
          </div>
        </div>
        <Button>Зарегистрироваться</Button>
      </div>
    </div>
  );
};
