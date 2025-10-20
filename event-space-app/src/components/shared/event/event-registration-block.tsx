import React from 'react';
import { Progress } from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { useParams } from 'react-router';
import { EventRegistrationButton } from '@/components/shared/event';
import { EventQrCodeDialog } from '@/components/modal';

interface Props {
  participantsQuantity: number;
  quantity: number;
  isRegistered?: boolean;
  className?: string;
  canRegister: boolean;
  canUnregister: boolean;
  qrToken?: string;
}

export const EventRegistrationBlock: React.FC<Props> = ({
  participantsQuantity,
  quantity,
  className,
  isRegistered,
  canRegister,
  canUnregister,
  qrToken,
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

      {isRegistered && qrToken && (
        <EventQrCodeDialog eventId={eventId} value={qrToken} />
      )}

      <EventRegistrationButton
        eventId={eventId}
        isUserRegistered={!!isRegistered}
        isDestructive={true}
        participantsQuantity={participantsQuantity}
        capacity={quantity}
        canRegister={canRegister}
        canUnregister={canUnregister}
      />
    </div>
  );
};
