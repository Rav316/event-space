import { EventCardLabel } from '@/components/shared/event-card-label.tsx';
import { Calendar, Clock4, MapPin, QrCode, Share2, Users } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import * as React from 'react';
import { categoryColors } from '@/constants/category-colors.ts';
import type { EventCategory } from '@/api/event-categories/model.ts';
import { Link } from 'react-router';
import { EventRegistrationButton } from '@/components/shared/event-registration-button.tsx';
import { getEventImageUrl } from '@/utils/get-event-image-url.ts';

interface Props {
  id: number;
  imageUrl?: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  registered: number;
  participants: number;
  author?: string;
  category: EventCategory;
  isRegistered?: boolean;
}

export const EventCard: React.FC<Props> = ({
  id,
  imageUrl,
  title,
  description,
  date,
  startTime,
  endTime,
  location,
  registered,
  participants,
  author,
  category,
  isRegistered,
}) => {
  return (
    <div
      className={
        'group relative min-h-[350px] flex flex-col rounded-2xl border border-[#E5E5E5] shadow-md hover:translate-y-[-3px] transition-all duration-300 hover:shadow-lg'
      }
    >
      <div className="absolute z-10 top-3 left-3">
        <Badge className={categoryColors[category.id - 1]}>
          {category.name}
        </Badge>
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
        <Link to={`/events/${id}`}>
          <img
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            src={getEventImageUrl(title, imageUrl)}
            alt={title}
          />
        </Link>
      </div>

      <div className={'flex flex-col p-[21px]'}>
        <div className={'pb-[21px] flex flex-col gap-y-3'}>
          <span className={'font-medium'}>{title}</span>
          <p className={'text-muted-foreground line-clamp-2 min-h-[48px]'}>
            {description}
          </p>
          <div className={'flex flex-col gap-y-2'}>
            <div
              className={
                'flex min-[1000px]:items-center min-[1000px]:gap-5 max-[1000px]:flex-col max-[1000px]:gap-y-2'
              }
            >
              <EventCardLabel
                Icon={Calendar}
                text={new Date(date).toLocaleDateString('ru-RU')}
              />
              <EventCardLabel
                Icon={Clock4}
                text={`${startTime.slice(0, 5)} - ${endTime.slice(0, 5)}`}
              />
            </div>
            <EventCardLabel Icon={MapPin} text={location} />
            <div
              className={
                'flex min-[1000px]:items-center min-[1000px]:gap-5 max-[1000px]:flex-col max-[1000px]:gap-y-2'
              }
            >
              <EventCardLabel
                Icon={Users}
                text={`${registered}/${participants} участников`}
              />
              {author && (
                <span className={'text-muted-foreground'}>Автор: {author}</span>
              )}
            </div>
          </div>
        </div>
        <EventRegistrationButton
          eventId={id}
          isUserRegistered={isRegistered}
          participantsQuantity={registered}
          capacity={participants}
        />
      </div>
    </div>
  );
};
