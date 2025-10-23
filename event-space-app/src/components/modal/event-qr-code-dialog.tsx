import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { Check, QrCode } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import React from 'react';

interface Props {
  eventId: number;
  value: string;
  attended: boolean;
}

export const EventQrCodeDialog: React.FC<Props> = ({ eventId, value, attended }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const confirmAttendanceUrl = `${apiUrl}/events/${eventId}/confirm-attendance?token=${value}`

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button variant='outline' className='w-full'>
          <QrCode />
          <span>Показать QR-код</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>QR-код для входа</DialogTitle>
        <div className='flex flex-col gap-4 items-center'>
          <div
            className={`relative w-48 h-48 rounded-lg flex items-center justify-center transition-all duration-300 ${
              attended ? 'bg-green-100' : 'bg-muted'
            }`}
          >
            <div className={`transition-all duration-300 ${attended ? 'blur-md opacity-60' : ''}`}>
              <QRCodeCanvas value={confirmAttendanceUrl} />
            </div>

            {attended && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <Check
                  className={`w-16 h-16 text-green-500 transform transition-all duration-300 ${
                    attended ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                />
              </div>
            )}

          </div>

          <span className='text-center text-muted-foreground'>
            Покажите этот QR-код организаторам для прохода на мероприятие
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

