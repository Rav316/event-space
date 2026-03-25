import { Dialog, DialogContent, DialogTitle } from '@/components/ui';
import { Check, Clock, Lock } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import React from 'react';

interface Props {
  eventId: number;
  value: string;
  attended?: boolean;
  open: boolean;
  eventFinished?: boolean;
  eventDate: string;
  startTime: string;
  onOpenChange: (open: boolean) => void;
}

const isFarFuture = (dateStr: string, timeStr: string): boolean => {
  const target = new Date(`${dateStr}T${timeStr}`);
  return target.getTime() - Date.now() > 24 * 60 * 60 * 1000;
};

export const EventQrCodeDialog: React.FC<Props> = ({
  value,
  attended,
  open,
  eventFinished,
  eventDate,
  startTime,
  onOpenChange,
}) => {
  const isDisabled = attended || eventFinished;
  const farFuture = !attended && !eventFinished && isFarFuture(eventDate, startTime);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>QR-код для входа</DialogTitle>
        <div className="flex flex-col gap-4 items-center">
          <div
            className={`relative w-48 h-48 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300 ${
              attended ? 'bg-green-100' : 'bg-muted'
            }`}
          >
            <div
              className={`transition-all duration-300 ${
                isDisabled || farFuture ? 'blur-md opacity-60' : ''
              }`}
            >
              <QRCodeCanvas value={value} />
            </div>

            {attended && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Check className="w-16 h-16 text-green-500 transition-all duration-300" />
              </div>
            )}

            {!attended && eventFinished && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center">
                <Lock className="w-10 h-10" />
              </div>
            )}

            {farFuture && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center">
                <Clock className="w-10 h-10 text-[#555]" />
              </div>
            )}
          </div>

          <span className="text-center text-sm text-muted-foreground">
            {eventFinished && !attended
              ? 'Это событие уже завершено'
              : farFuture
                ? 'QR-код станет доступен за 24 часа до начала мероприятия'
                : 'Покажите этот QR-код организаторам для прохода на мероприятие'}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
