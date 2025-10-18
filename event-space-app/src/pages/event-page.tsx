import { Badge, Button, Skeleton } from '@/components/ui';
import {
  ArrowLeft,
  Calendar,
  CircleCheck,
  Flame,
  Info,
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
  EventReviews,
  EventShareBlock,
  EventSkeleton,
} from '@/components/shared';
import { EventOrganizerBlock } from '@/components/shared/event-organizer-block.tsx';
import { useNavigate, useParams } from 'react-router';
import { useEventById, useStepsByEvent } from '@/api/events/hooks.ts';
import { formatDate } from '@/utils/format-date.ts';
import { getEventImageUrl } from '@/utils/get-event-image-url.ts';
import Page404 from '@/pages/page-404.tsx';
import axios, { type AxiosError } from 'axios';
import { formatDateToRuFormat } from '@/utils/format-date-to-ru-format.ts';
import { compareWithCurrentTime } from '@/utils/compare-with-current-time.ts';

const EventPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const eventId = Number(params.eventId);

  const {
    data: event,
    isPending: isEventPending,
    isError,
    error,
  } = useEventById(eventId);

  const { data: eventSteps, isPending: isStepsPending } =
    useStepsByEvent(eventId);

  if (isError && (error as AxiosError)?.response?.status === 404) {
    return <Page404 />;
  }

  if (isEventPending) {
    return (
      <Wrapper className="max-w-[1400px]">
        <EventSkeleton />
      </Wrapper>
    );
  }

  if (isError) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return <Page404 />;
      }
    }
    return (
      <Wrapper className="max-w-[1400px]">
        <EventSkeleton />
      </Wrapper>
    );
  }

  if (!event) {
    return (
      <Wrapper className="max-w-[1400px]">
        <EventSkeleton />
      </Wrapper>
    );
  }

  return (
    <Wrapper className="max-w-[1400px]">
      <div className="flex flex-col gap-5 mt-[20px]">
        <div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft />
            <span>Назад</span>
          </Button>
        </div>
        {compareWithCurrentTime(event.eventDate, event.endTime) === 1 && (
          <div
            className={
              'flex items-center gap-3 bg-[#F4F2F7] p-3 rounded-lg border border-[#E5E5E5]'
            }
          >
            <Info className="text-muted-foreground shrink-0" />
            <span className={'text-muted-foreground'}>
              Это мероприятие завершилось {formatDate(event.eventDate)}, в{' '}
              {event.endTime.slice(0, 5)}
            </span>
          </div>
        )}

        <div className="flex gap-5 max-[980px]:flex-col">
          <div className="flex flex-col gap-5 flex-7">
            <div className="group relative rounded-2xl">
              <img
                className="w-full object-cover h-[336px] rounded-2xl"
                src={getEventImageUrl(event.name, event?.imageUrl)}
                alt="event-example"
              />
              <div className="absolute z-10 top-3 left-3">
                <Badge className={categoryColors[event?.category.id - 1]}>
                  {event?.category.name}
                </Badge>
              </div>
              <div className="absolute z-10 top-3 right-3 flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => e.preventDefault()}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => e.preventDefault()}
                >
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <h3 className="text-3xl font-bold">{event.name}</h3>

            <div className="flex flex-wrap items-center gap-2">
              {event.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 max-[550px]:grid-cols-1 items-center gap-2 w-full">
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
                caption="участников"
              />
              <EventBadge
                Icon={Flame}
                text={
                  event.deadline ? formatDateToRuFormat(event.deadline) : '---'
                }
                caption="дедлайн регистрации"
              />
            </div>

            {event.description && (
              <EventDescription description={event.description} />
            )}
            {isStepsPending || !eventSteps ? (
              <div className={'flex flex-col gap-4'}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton className="h-10 w-full" key={index} />
                ))}
              </div>
            ) : (
              <>
                {eventSteps.length > 0 && <EventProgram steps={eventSteps} />}
              </>
            )}
          </div>

          <div className="flex-3 flex flex-col gap-4 min-[900px]:max-[980px]:flex-row">
            {event.isAttended && (
              <div
                className={
                  'flex gap-4 items-center rounded-2xl border border-green-300 bg-green-50 p-5'
                }
              >
                <div
                  className={
                    'rounded-full w-10 h-10 bg-green-600 flex justify-center items-center'
                  }
                >
                  <CircleCheck className={'text-white'} />
                </div>
                <div className={'flex flex-col gap-0.5'}>
                  <span className={'font-medium text-green-600'}>
                    Вы посетили это мероприятие
                  </span>
                  <span className={'text-green-600 text-sm'}>
                    Спасибо за участие
                  </span>
                </div>
              </div>
            )}
            <EventRegistrationBlock
              participantsQuantity={event.participantQuantity}
              isRegistered={event.isRegistered}
              quantity={event.space.capacity}
              className="max-[980px]:flex-1 max-[900px]:flex-none"
              canRegister={event.canRegister}
              canUnregister={event.canUnregister}
              qrToken={event.qrToken}
            />
            {event.author && (
              <EventOrganizerBlock
                firstName={event.author.firstName}
                lastName={event.author.lastName}
                faculty={event.author.faculty}
                avatarUrl={event.author.avatarUrl}
                className={'max-[980px]:flex-1 max-[900px]:flex-none'}
              />
            )}
            <EventShareBlock className="max-[980px]:flex-1 max-[900px]:flex-none" />
          </div>
        </div>
        <EventReviews eventId={eventId} />
      </div>
    </Wrapper>
  );
};

export default EventPage;
