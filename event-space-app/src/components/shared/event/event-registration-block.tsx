import React, { useState } from 'react';
import { Button, Progress, Separator } from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { useParams } from 'react-router';
import { EventRegistrationButton } from '@/components/shared/event';
import { EventQrCodeDialog } from '@/components/modal';
import { QrCode } from 'lucide-react';
import { compareWithCurrentTime } from '@/utils/compare-with-current-time.ts';
import { compareWithToday } from '@/utils/compare-with-current-date.ts';
import { formatDate } from '@/utils/format-date.ts';

interface Props {
  registeredUsers: number;
  quantity: number;
  isRegistered?: boolean;
  className?: string;
  canRegister: boolean;
  canUnregister: boolean;
  qrToken?: string;
  attended?: boolean;
  eventDate: string;
  endTime: string;
  deadline?: string;
}

export const EventRegistrationBlock: React.FC<Props> = ({
  registeredUsers,
  quantity,
  className,
  isRegistered,
  canRegister,
  canUnregister,
  qrToken,
  attended = false,
  eventDate,
  endTime,
  deadline,
}) => {
  const params = useParams();
  const eventId = Number(params.eventId);
  const [openQr, setOpenQr] = useState(false);

  return (
    <div
      className={cn(
        'border border-[#E8E8E8] rounded-2xl p-5 flex flex-col gap-4',
        className,
      )}
    >
      <span className="font-medium text-xl">Регистрация</span>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span>Зарегистрировано</span>
          <span>
            {registeredUsers}/{quantity}
          </span>
        </div>
        <Progress value={(registeredUsers / quantity) * 100} />
        <span className="text-muted-foreground text-sm">
          {quantity - registeredUsers} мест осталось
        </span>
      </div>

      {isRegistered && qrToken && (
        <>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpenQr(true)}
          >
            <QrCode />
            <span>Показать QR-код</span>
          </Button>

          <EventQrCodeDialog
            eventId={eventId}
            value={qrToken}
            attended={attended}
            open={openQr}
            onOpenChange={setOpenQr}
            eventFinished={compareWithCurrentTime(eventDate, endTime) === 1}
          />
        </>
      )}

      <EventRegistrationButton
        eventId={eventId}
        isUserRegistered={!!isRegistered}
        isDestructive={true}
        registeredUsers={registeredUsers}
        capacity={quantity}
        canRegister={canRegister}
        canUnregister={canUnregister}
        deadline={deadline}
      />

      <Separator />
      {deadline && compareWithToday(deadline) === -1 && (
        <div className={'flex flex-col gap-1 items-center'}>
          <span
            className={
              'text-center text-muted-foreground text-base max-[420px]:text-start min-[900px]:max-[1309px]:leading-none'
            }
          >
            Дедлайн регистрации на мероприятие истёк.
          </span>

          <span
            className={
              'text-center text-muted-foreground text-sm max-[420px]:text-start  min-[900px]:max-[1309px]:leading-none'
            }
          >
            Регистрация была доступна до {formatDate(deadline)}
          </span>
        </div>
      )}
    </div>
  );
};
