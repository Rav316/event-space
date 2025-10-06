import React from 'react';
import { Progress } from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { useParams } from 'react-router';
import { EventRegistrationButton } from '@/components/shared';

interface Props {
  registered: number;
  quantity: number;
  className?: string;
}

export const EventRegistrationBlock: React.FC<Props> = ({
  registered,
  quantity,
  className,
}) => {
  const params = useParams();
  const eventId = Number(params.eventId);


  return (
    <div
      className={cn(
        'border border-[#E5E5E5] rounded-2xl p-5 flex flex-col gap-4',
        className,
      )}
    >
      <span className={'font-medium text-xl'}>Регистрация</span>
      <div className={'flex flex-col gap-1'}>
        <div className={'flex justify-between'}>
          <span>Зарегистрировано</span>
          <span>
            {registered}/{quantity}
          </span>
        </div>
        <Progress value={(registered / quantity) * 100} />
        <span className={'text-muted-foreground text-sm'}>
          {quantity - registered} мест осталось
        </span>
      </div>
      <EventRegistrationButton eventId={eventId}/>
    </div>
  );
};
