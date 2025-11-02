import { ArrowRight, BellPlus, CalendarOff } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui';

export const NoActualEventsBlock = () => {
  return (
    <div
      className={
        'border border-dashed border-[#E5E5E5] rounded-2xl p-6 flex flex-col items-center gap-4'
      }
    >
      <div
        className={
          'rounded-full w-20 h-20 bg-[#F4F2F7] flex items-center justify-center'
        }
      >
        <CalendarOff
          width={40}
          height={40}
          className={'m-auto text-muted-foreground'}
        />
      </div>
      <span className={'font-medium text-xl text-center'}>
        Пока нет актуальных мероприятий
      </span>
      <p className={'text-muted-foreground text-center max-w-[600px]'}>
        В данный момент нет запланированных событий. Станьте первым, кто создаст
        интересное мероприятие для студентов, или подпишитесь на уведомления о
        новых событиях.
      </p>
      <div
        className={
          'flex justify-center min-[528px]:items-center max-[528px]:flex-col gap-4'
        }
      >
        <Link to={'/events'}>
          <Button className={'h-[40px] max-[528px]:w-full'}>
            <span className={'font-medium'}>Создать мероприятие</span>
            <ArrowRight />
          </Button>
        </Link>
        <Button variant={'outline'} className={'h-[40px]'}>
          <BellPlus />
          <span>Подписаться на уведомления</span>
        </Button>
      </div>
    </div>
  );
};
