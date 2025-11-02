import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router';

export const NoUpcomingEventsBlock = () => {
  const navigate = useNavigate();

  return (
    <div
      className={
        'flex flex-col items-center gap-3 border border-[#E5E5E5] rounded-2xl p-5'
      }
    >
      <Calendar size={50} className={'text-muted-foreground'} />
      <div className={'flex flex-col items-center gap-1'}>
        <h3 className={'font-medium text-xl text-center'}>
          Нет предстоящих мероприятий
        </h3>
        <span className={'text-muted-foreground text-center'}>
          Вы пока не зарегистрировались ни на одно мероприятие
        </span>
      </div>
      <Button onClick={() => navigate('/events')}>Найти мероприятия</Button>
    </div>
  );
};
