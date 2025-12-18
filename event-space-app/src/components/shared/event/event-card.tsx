import {
  Calendar,
  Check,
  Clock4,
  Flame,
  MapPin,
  QrCode,
  Share2,
  Users,
} from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import * as React from 'react';
import { categoryColors } from '@/constants/category-colors.ts';
import { Link } from 'react-router';
import { getEventImageUrl } from '@/utils/get-event-image-url.ts';
import type { EventListDto } from '@/api/events/model.ts';
import { formatDateToRuFormat } from '@/utils/format-date-to-ru-format.ts';
import {
  EventCardLabel,
  EventRegistrationButton,
} from '@/components/shared/event';

interface Props {
  event: EventListDto;
}

export const EventCard: React.FC<Props> = ({ event }) => {
  return (
    <div
      className={
        'group relative min-h-[350px] flex flex-col rounded-2xl border border-[#E5E5E5] shadow-md hover:translate-y-[-3px] transition-all duration-300 hover:shadow-lg'
      }
    >
      <div className="absolute flex flex-col gap-2 z-10 top-3 left-3">
        <Badge className={categoryColors[event.category.id - 1]}>
          {event.category.name}
        </Badge>
        {event.isAttended && (
          <Badge className={'bg-green-500'}>
            <Check />
            <span>Посещено</span>
          </Badge>
        )}
      </div>

      <div className={'absolute z-10 top-3 right-3 flex space-x-2'}>
        <Button
          variant="secondary"
          size="sm"
          className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.preventDefault()}
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.preventDefault()}
        >
          <QrCode className="h-4 w-4" />
        </Button>
      </div>

      <div className="overflow-hidden rounded-t-2xl">
        <Link to={`/events/${event.id}`}>
          <img
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            src={getEventImageUrl(event.name, event.imageUrl)}
            alt={event.name}
          />
        </Link>
      </div>

      <div className={'flex flex-col p-[21px]'}>
        <div className={'pb-[21px] flex flex-col gap-y-3'}>
          <span className={'font-medium'}>{event.name}</span>
          <p className={'text-muted-foreground line-clamp-2 min-h-12'}>
            {event.shortDescription}
          </p>
          <div className={'flex flex-col gap-y-2'}>
            <div
              className={
                'flex min-[1000px]:items-center min-[1000px]:gap-5 max-[1000px]:flex-col max-[1000px]:gap-y-2'
              }
            >
              <EventCardLabel
                Icon={Calendar}
                text={formatDateToRuFormat(event.eventDate)}
              />
              <EventCardLabel
                Icon={Clock4}
                text={`${event.startTime.slice(0, 5)} - ${event.endTime.slice(0, 5)}`}
              />
            </div>
            <div
              className={
                'flex min-[1000px]:items-center min-[1000px]:gap-5 max-[1000px]:flex-col max-[1000px]:gap-y-2'
              }
            >
              {event.deadline && (
                <EventCardLabel
                  iconClassName={'text-orange-500'}
                  Icon={Flame}
                  text={formatDateToRuFormat(event.deadline)}
                />
              )}
              <EventCardLabel Icon={MapPin} text={`${event.space.building.name}, ${event.space.name}`} />
            </div>
            <div
              className={
                'flex min-[1000px]:items-center min-[1000px]:gap-5 max-[1000px]:flex-col max-[1000px]:gap-y-2'
              }
            >
              <EventCardLabel
                Icon={Users}
                text={`${event.registeredUsers}/${event.participantQuantity} участников`}
              />
              {event.author && (
                <span className={'text-muted-foreground'}>
                  Автор: {event.author}
                </span>
              )}
            </div>
          </div>
        </div>
        <EventRegistrationButton
          eventId={event.id}
          isUserRegistered={event.isRegistered}
          canRegister={event.canRegister}
          canUnregister={event.canUnregister}
          registeredUsers={event.registeredUsers}
          capacity={event.participantQuantity}
          deadline={event.deadline}
        />
      </div>
    </div>
  );
};
