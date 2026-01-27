import React, { useState } from 'react';
import type { EventListForUserDto } from '@/api/events/model.ts';
import { getEventImageUrl } from '@/utils/get-event-image-url.ts';
import { Badge, Button } from '@/components/ui';
import { EventCardLabel } from '@/components/shared/event/event-card-label.tsx';
import { Calendar, Clock, MapPin, QrCode } from 'lucide-react';
import { categoryColors } from '@/constants/category-colors.ts';
import { formatDate } from '@/utils/format-date.ts';
import { Link } from 'react-router';
import { EventQrCodeDialog } from '@/components/modal';
import { compareWithCurrentTime } from '@/utils/compare-with-current-time.ts';

interface Props {
  event: EventListForUserDto;
}

export const EventListItem: React.FC<Props> = ({ event }) => {
  const [openQr, setOpenQr] = useState(false);

  return (
    <div className="flex gap-4 border border-[#E5E5E5] rounded-2xl overflow-hidden max-[900px]:flex-col">
      <div className="relative w-[450px] shrink-0 max-[900px]:relative max-[900px]:w-full max-[900px]:h-60">
        <Link to={`/events/${event.id}`}>
          <img
            className="absolute inset-0 w-full h-full object-cover max-[900px]:static max-[900px]:h-full"
            src={getEventImageUrl(event.name, event.imageUrl)}
            alt={event.name}
          />
        </Link>
      </div>

      <div className="flex flex-col gap-4 p-5 w-full justify-between">
        <div className="flex items-center gap-2">
          <Badge className={categoryColors[event.category.id - 1]}>
            {event.category.name}
          </Badge>
          {compareWithCurrentTime(event.eventDate, event.endTime) === 1 &&
            (event.attended ? (
              <Badge className="bg-green-100 text-green-900">
                Подтверждено
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-900">Пропущено</Badge>
            ))}
        </div>

        <h3 className="font-medium text-xl">{event.name}</h3>

        <div className="flex items-center gap-4 max-[1200px]:flex-col max-[1200px]:items-start">
          <EventCardLabel Icon={Calendar} text={formatDate(event.eventDate)} />
          <EventCardLabel
            Icon={Clock}
            text={`${event.startTime.slice(0, 5)} - ${event.endTime.slice(0, 5)}`}
          />
          <EventCardLabel
            Icon={MapPin}
            text={`${event.space.building.name}, ${event.space.name}`}
          />
        </div>

        <div className="flex items-center gap-4 justify-between max-[1100px]:flex-col max-[1100px]:items-start">
          <span className="text-muted-foreground text-sm">
            Зарегистрирован: {formatDate(event.registeredAt)}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenQr((prev) => !prev)}
            >
              <QrCode />
              <span>QR-код</span>
            </Button>
            <EventQrCodeDialog
              eventId={event.id}
              value={event.qrToken}
              open={openQr}
              attended={event.attended}
              onOpenChange={setOpenQr}
              eventFinished={
                compareWithCurrentTime(event.eventDate, event.endTime) === 1
              }
            />
            <Link to={`/events/${event.id}`}>
              <Button variant="outline">Подробнее</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
