import type { EventListMyDto } from '@/api/events/model.ts';
import * as React from 'react';
import { useState } from 'react';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { categoryColors } from '@/constants/category-colors.ts';
import {
  Calendar,
  Clock4,
  EllipsisVertical,
  Eye,
  Flame,
  MapPin,
  SquarePen,
  Users,
  Trash,
} from 'lucide-react';
import { Link } from 'react-router';
import { getEventImageUrl } from '@/utils/get-event-image-url.ts';
import { EventCardLabel } from '@/components/shared/event';
import { formatDateToRuFormat } from '@/utils/format-date-to-ru-format.ts';
import { cn } from '@/lib/utils.ts';
import { compareWithToday } from '@/utils/compare-with-current-date.ts';
import { RemoveEventModal } from '@/components/modal';

interface Props {
  event: EventListMyDto;
}

export const MyEventCard: React.FC<Props> = ({ event }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={
        'group relative min-h-[350px] flex flex-col rounded-2xl border border-[#E5E5E5] shadow-md  transition-all duration-300'
      }
    >
      <div className="absolute flex flex-col gap-2 z-10 top-3 left-3">
        <Badge className={categoryColors[event.category.id - 1]}>
          {event.category.name}
        </Badge>
      </div>

      <div className={'absolute z-10 top-3 right-3 flex space-x-2'}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className={
                'w-10 h-8 bg-white/50 hover:bg-white/80 transition-all duration-300 rounded-md flex items-center justify-center'
              }
            >
              <EllipsisVertical className={'w-4 h-4'} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={'end'} collisionPadding={20}>
            <DropdownMenuItem>
              <Eye />
              Просмотр
            </DropdownMenuItem>
            <Link to={`/events/${event.id}/edit`}>
              <DropdownMenuItem className={'items-end'}>
                <SquarePen />
                Редактировать
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setModalOpen(true)}>
              <Trash />
              <span className={'text-destructive'}>Удалить</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <RemoveEventModal
        eventId={event.id}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      <div className="overflow-hidden rounded-t-2xl">
        <Link to={`/events/${event.id}`}>
          <img
            className="w-full h-48 object-cover transition-transform duration-300"
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
                  iconClassName={cn(
                    compareWithToday(event.deadline) === -1 &&
                      'text-orange-500',
                  )}
                  Icon={Flame}
                  text={formatDateToRuFormat(event.deadline)}
                />
              )}

              <EventCardLabel
                Icon={MapPin}
                text={`${event.space.building.name}, ${event.space.name}`}
              />
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
        <div
          className={
            'flex items-center gap-2 max-[1100px]:flex-col max-[900px]:flex-row min-[528px]:max-[700px]:hidden max-[370px]:flex-col'
          }
        >
          <Button variant={'outline'} className={'flex-1 w-full'}>
            <SquarePen />
            <span>Редактировать</span>
          </Button>
          <Button className={'flex-1 w-full'}>
            <Eye />
            <span>Просмотр</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
