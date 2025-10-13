import { Badge, Button } from '@/components/ui';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  QrCode,
  Share2,
  Users,
} from 'lucide-react';
import { Wrapper } from '@/components/hoc';
import { categoryColors } from '@/constants/category-colors.ts';
import {
  EventBadge,
  EventDescription,
  EventProgram,
  EventRegistrationBlock,
  EventShareBlock,
  EventSkeleton,
} from '@/components/shared';
import { EventOrganizerBlock } from '@/components/shared/event-organizer-block.tsx';
import { useNavigate, useParams } from 'react-router';
import { useEventById } from '@/api/events/hooks.ts';
import { formatDate } from '@/utils/format-date.ts';
import { getEventImageUrl } from '@/utils/get-event-image-url.ts';

const EventPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const eventId = Number(params.eventId);

  const { data: event, isPending: isEventPending } = useEventById(eventId);

  return (
    <Wrapper className={'max-w-[1400px]'}>
      <div className={'flex flex-col gap-5 max-w-[1400px] mt-[20px]'}>
        <div>
          <Button variant={'outline'} onClick={() => navigate(-1)}>
            <ArrowLeft />
            <span>Назад</span>
          </Button>
        </div>
        {isEventPending || !event ? (
          <EventSkeleton />
        ) : (
          <div className={'flex gap-5 max-[980px]:flex-col'}>
            <div className={'flex flex-col gap-5 flex-7'}>
              <div className={'group relative rounded-2xl'}>
                <img
                  className={'w-full object-cover h-[336px] rounded-2xl'}
                  src={getEventImageUrl(event.name, event?.imageUrl)}
                  alt={'event-example'}
                />
                <div className="absolute z-10 top-3 left-3">
                  <Badge className={categoryColors[event?.category.id - 1]}>
                    {event?.category.name}
                  </Badge>
                </div>
                <div className={'absolute z-10 top-3 right-3 flex space-x-2'}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="opacity-100 transition-opacity"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="opacity-100 transition-opacity"
                    onClick={(e) => e.preventDefault()}
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h3 className={'text-3xl font-bold'}>{event.name}</h3>
              <div className={'flex flex-wrap items-center gap-2'}>
                {event.tags.map((tag, index) => (
                  <Badge key={index} variant={'outline'}>
                    {tag}
                  </Badge>
                ))}
              </div>

              <div
                className={
                  'flex items-center gap-2 w-full max-[650px]:flex-col'
                }
              >
                <EventBadge
                  Icon={Calendar}
                  text={formatDate(event.eventDate)}
                  caption={`${event.startTime.slice(0, 5)} - ${event.endTime.slice(0, 5)}`}
                />
                <EventBadge
                  Icon={MapPin}
                  text={`${event.space.building.name}, ${event.space.name}`}
                  caption={`${event.space.building.address}`}
                />
                <EventBadge
                  Icon={Users}
                  text={`${event.participantQuantity}/${event.space.capacity}`}
                  caption={'участников'}
                />
              </div>
              {event.description && (
                <EventDescription description={event.description} />
              )}
              {event.steps.length > 0 && <EventProgram steps={event.steps} />}
            </div>
            <div
              className={
                'lex-3 flex flex-col gap-4 min-[900px]:max-[980px]:flex-row'
              }
            >
              <EventRegistrationBlock
                participantsQuantity={event.participantQuantity}
                isRegistered={event.isRegistered}
                quantity={event.space.capacity}
                className={'max-[980px]:flex-1 max-[900px]:flex-none'}
              />
              <EventOrganizerBlock
                className={'max-[980px]:flex-1 max-[900px]:flex-none'}
              />
              <EventShareBlock
                className={'max-[980px]:flex-1 max-[900px]:flex-none'}
              />
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default EventPage;
