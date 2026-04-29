import { Badge, Button, Skeleton } from '@/components/ui';
import {
  ArrowLeft,
  Calendar,
  CircleCheck,
  Flag,
  Flame,
  Info,
  MapPin,
  QrCode,
  Share2,
  Users,
} from 'lucide-react';
import { Wrapper } from '@/components/hoc';
import { categoryBadgeStyle } from '@/utils/category-badge-style.ts';
import { useNavigate, useParams } from 'react-router';
import { useEventById, useStepsByEvent } from '@/api/events/hooks.ts';
import { formatDate } from '@/utils/format-date.ts';
import { getEventImageUrl } from '@/utils/get-event-image-url.ts';
import Page404 from '@/pages/page-404.tsx';
import axios, { type AxiosError } from 'axios';
import { formatDateToRuFormat } from '@/utils/format-date-to-ru-format.ts';
import { compareWithCurrentTime } from '@/utils/compare-with-current-time.ts';
import { EventReviews } from '@/components/shared/event-review';
import {
  EventBadge,
  EventComplaintDialog,
  EventDescription,
  EventOrganizerBlock,
  EventProgram,
  EventRegistrationBlock,
  EventShareBlock,
  EventSkeleton,
} from '@/components/shared/event';
import { cn } from '@/lib/utils.ts';
import { compareWithToday } from '@/utils/compare-with-current-date.ts';
import { EventQrCodeDialog, EventShareDialog } from '@/components/modal';
import { useState } from 'react';
import { getPlaceholderImageUrl } from '@/utils/get-placeholder-image-url.ts';

const EventPage = () => {
  const [openQr, setOpenQr] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openComplaint, setOpenComplaint] = useState(false);

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
      <div className="flex flex-col gap-5 mt-5">
        <div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft />
            <span>Назад</span>
          </Button>
        </div>
        {compareWithCurrentTime(event.eventDate, event.endTime) === 1 && (
          <div
            className={
              'flex items-center gap-3 bg-[#F7F5F0] p-3 rounded-lg border border-[#E8E8E8]'
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
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = getPlaceholderImageUrl(event.name);
                }}
                alt="event-example"
              />
              <div className="absolute z-10 top-3 left-3">
                <Badge style={categoryBadgeStyle(event?.category.color)}>
                  {event?.category.name}
                </Badge>
              </div>
              <div className="absolute z-10 top-3 right-3 flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setOpenShare(true)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <EventShareDialog
                  open={openShare}
                  onOpenChange={setOpenShare}
                  eventName={event.name}
                  eventId={event.id}
                />
                <Button
                  disabled={!event.qrToken}
                  variant="secondary"
                  size="sm"
                  onClick={() => setOpenQr((prev) => !prev)}
                >
                  <QrCode className="h-4 w-4" />
                </Button>
                <EventQrCodeDialog
                  eventId={event.id}
                  value={event.qrToken}
                  open={openQr}
                  onOpenChange={setOpenQr}
                  eventFinished={
                    compareWithCurrentTime(event.eventDate, event.endTime) === 1
                  }
                  eventDate={event.eventDate}
                  startTime={event.startTime}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setOpenComplaint(true)}
                >
                  <Flag className="h-4 w-4" />
                </Button>
                <EventComplaintDialog
                  open={openComplaint}
                  onClose={() => setOpenComplaint(false)}
                  eventId={event.id}
                />
              </div>
            </div>

            <h3 className="text-3xl font-semibold">{event.name}</h3>

            <div className="flex flex-wrap items-center gap-2">
              {event.tags?.map((tag, index) => (
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
                text={`${event.registeredUsers}/${event.participantQuantity}`}
                caption="участников"
              />
              <EventBadge
                Icon={Flame}
                text={
                  event.deadline ? formatDateToRuFormat(event.deadline) : '---'
                }
                caption="дедлайн регистрации"
                iconClassName={cn(
                  compareWithToday(event.deadline) === -1 && 'text-orange-500',
                )}
              />
            </div>

          </div>

          <div className="flex-3 flex flex-col gap-4">
            {event.isAttended && (
              <div
                className={
                  'flex gap-4 items-center rounded-2xl border border-green-300 bg-green-50 p-5'
                }
              >
                <div
                  className={
                    'rounded-full w-10 h-10 bg-green-600 flex justify-center items-center shrink-0'
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
            <div
              className={'flex flex-col gap-4 min-[900px]:max-[980px]:flex-row'}
            >
              <EventRegistrationBlock
                registeredUsers={event.registeredUsers}
                isRegistered={event.isRegistered}
                quantity={event.participantQuantity}
                className="max-[980px]:flex-1 max-[900px]:flex-none"
                canRegister={event.canRegister}
                canUnregister={event.canUnregister}
                qrToken={event.qrToken}
                attended={event.isAttended}
                eventDate={event.eventDate}
                startTime={event.startTime}
                endTime={event.endTime}
                deadline={event.deadline}
              />
              {event.author && (
                <EventOrganizerBlock
                  firstName={event.author.firstName}
                  lastName={event.author.lastName}
                  program={event.author.program}
                  avatarUrl={event.author.avatarUrl}
                  className={'max-[980px]:flex-1 max-[900px]:flex-none'}
                />
              )}
              <EventShareBlock
                className="max-[980px]:flex-1 max-[900px]:flex-none"
                eventName={event.name}
                eventDescription={event.description}
                eventDate={event.eventDate}
                startTime={event.startTime}
                endTime={event.endTime}
                location={`${event.space.building.name}, ${event.space.name}`}
              />
            </div>
          </div>
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
          <>{eventSteps.length > 0 && <EventProgram steps={eventSteps} />}</>
        )}

        <EventReviews event={event} />
      </div>
    </Wrapper>
  );
};

export default EventPage;
