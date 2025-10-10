import React, { useEffect, useRef, useState } from 'react';
import { Progress } from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { useParams } from 'react-router';
import { EventRegistrationButton } from '@/components/shared';
import { CheckCircle } from 'lucide-react';
import { EventQrCodeDialog } from '@/components/modal';

interface Props {
  participantsQuantity: number;
  quantity: number;
  isRegistered?: boolean;
  className?: string;
}

export const EventRegistrationBlock: React.FC<Props> = ({
  participantsQuantity,
  quantity,
  className,
  isRegistered,
}) => {
  const params = useParams();
  const eventId = Number(params.eventId);

  const [showSuccess, setShowSuccess] = useState(false);
  const prevRegistered = useRef(isRegistered);

  useEffect(() => {
    if (!prevRegistered.current && isRegistered) {
      setShowSuccess(true);
    }

    if (prevRegistered.current && !isRegistered) {
      setShowSuccess(false);
    }

    prevRegistered.current = isRegistered;
  }, [isRegistered]);

  return (
    <div
      className={cn(
        'border border-[#E5E5E5] rounded-2xl p-5 flex flex-col gap-4',
        className,
      )}
    >
      <span className="font-medium text-xl">Регистрация</span>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span>Зарегистрировано</span>
          <span>
            {participantsQuantity}/{quantity}
          </span>
        </div>
        <Progress value={(participantsQuantity / quantity) * 100} />
        <span className="text-muted-foreground text-sm">
          {quantity - participantsQuantity} мест осталось
        </span>
      </div>

      {showSuccess && (
        <>
          <div className="flex items-center gap-2 border border-green-800 bg-green-50 text-green-600 rounded-2xl p-3 transition-all duration-300">
            <CheckCircle />
            <span>Вы зарегистрированы!</span>
          </div>
        </>
      )}

      {isRegistered && <EventQrCodeDialog />}

      <EventRegistrationButton
        eventId={eventId}
        isUserRegistered={!!isRegistered}
        isDestructive={true}
        participantsQuantity={participantsQuantity}
        capacity={quantity}
      />
    </div>
  );
};
