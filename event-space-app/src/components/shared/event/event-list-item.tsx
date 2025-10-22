import React from 'react';
import type { EventListDto } from '@/api/events/model.ts';
import { getEventImageUrl } from '@/utils/get-event-image-url.ts';
import { Badge, Button } from '@/components/ui';
import { EventCardLabel } from '@/components/shared/event/event-card-label.tsx';
import { Calendar, Clock, MapPin, QrCode } from 'lucide-react';

interface Props {
  event: EventListDto;
}

export const EventListItem: React.FC<Props> = ({ event }) => {
  return (
    <div className='flex gap-4 border border-[#E5E5E5] rounded-2xl overflow-hidden max-[900px]:flex-col'>
      <div className='relative w-[450px] flex-shrink-0 max-[900px]:relative max-[900px]:w-full max-[900px]:h-60'>
        <img
          className='absolute inset-0 w-full h-full object-cover max-[900px]:static max-[900px]:h-full'
          src={getEventImageUrl(event.name, event.imageUrl)}
          alt={event.name}
        />
      </div>

      <div className='flex flex-col gap-4 p-5 w-full justify-between'>
        <div className='flex items-center gap-2'>
          <Badge className='bg-orange-100 text-orange-900'>IT-секции</Badge>
          <Badge className='bg-green-100 text-green-900'>Подтверждено</Badge>
        </div>

        <h3 className='font-medium text-xl'>
          Лекция: Современные методы Data Science
        </h3>

        <div className='flex items-center gap-4 max-[1200px]:flex-col max-[1200px]:items-start'>
          <EventCardLabel Icon={Calendar} text={'15 февраля'} />
          <EventCardLabel Icon={Clock} text={'10:00 - 12:00'} />
          <EventCardLabel Icon={MapPin} text={'Главный корпус, аудитория 205'} />
        </div>

        <div className='flex items-center gap-4 justify-between max-[1100px]:flex-col max-[1100px]:items-start'>
          <span className='text-muted-foreground text-sm'>
            Зарегистрирован: 12 февраля 2024
          </span>
          <div className='flex items-center gap-2'>
            <Button variant='outline'>
              <QrCode />
              <span>QR-код</span>
            </Button>
            <Button variant='outline'>Подробнее</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

