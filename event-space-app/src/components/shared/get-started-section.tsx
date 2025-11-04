import { Button } from '@/components/ui';
import { ArrowRight, Calendar } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils.ts';
import { useMe } from '@/api/auth/hooks.ts';
import { Link } from 'react-router';

interface Props {
  className?: string;
}

export const GetStartedSection: React.FC<Props> = ({ className }) => {
  const {data} = useMe();

  return (
    <div
      className={cn(
        className,
        'flex flex-col gap-y-5 items-center border rounded-2xl bg-[#F4F2F7] p-5',
      )}
    >
      <span className={'font-medium text-2xl'}>Организуете мероприятия?</span>
      <p className={'text-muted-foreground max-w-[650px] text-center'}>
        EventSpace поможет вам привлечь больше участников, упростить регистрацию
        и получить детальную аналитику. Начните с первого мероприятия уже
        сегодня!
      </p>
      <div
        className={
          'flex justify-center min-[528px]:items-center max-[528px]:flex-col gap-4'
        }
      >
        <Link to={'/events'}>
          <Button className={'h-[40px]'}>
            <Calendar />
            <span className={'font-medium'}>Смотреть все мероприятия</span>
            <ArrowRight />
          </Button>
        </Link>
        {!data && (
          <Button variant={'outline'} className={'h-[40px]'}>
            <span>Зарегистрироваться</span>
          </Button>
        )}
      </div>
    </div>
  );
};
