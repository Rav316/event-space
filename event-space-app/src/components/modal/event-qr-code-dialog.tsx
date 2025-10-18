import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui';
import { QrCode } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import React from 'react';

interface Props {
  eventId: number;
  value: string;
}

export const EventQrCodeDialog: React.FC<Props> = ({eventId, value}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const confirmAttendanceUrl = `${apiUrl}/events/${eventId}/confirm-attendance?token=${value}`;
  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button variant={'outline'} className={'w-full'}>
          <QrCode />
          <span>Показать QR-код</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>QR-код для входа</DialogTitle>
        <div className={'flex flex-col gap-4 items-center'}>
          <div className={'w-48 h-48 bg-muted rounded-lg flex items-center justify-center'}>
            <QRCodeCanvas value={confirmAttendanceUrl} />
          </div>
          <span className={'text-center text-muted-foreground'}>Покажите этот QR-код организаторам для прохода на мероприятие</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
