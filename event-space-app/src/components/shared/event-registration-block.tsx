import React, { useState } from 'react';
import { Progress } from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { useParams } from 'react-router';
import { EventRegistrationButton } from '@/components/shared';
import { CheckCircle } from 'lucide-react';

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
  const [isRegistered, setIsRegistered] = useState(false);

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
      {isRegistered && (
        <div
          className={
            'flex items-center gap-2 border border-green-800 bg-green-50 text-green-600 rounded-2xl p-3'
          }
        >
          <CheckCircle />
          <span>Вы зарегистрированы!</span>
        </div>
      )}
      <EventRegistrationButton
        eventId={eventId}
        isUserRegistered={false}
        isDestructive={true}
        onToggleRegistration={setIsRegistered}
      />
    </div>
  );
};
