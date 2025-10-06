import { EventCard } from '@/components/shared/event-card.tsx';
import * as React from 'react';
import { cn } from '@/lib/utils.ts';
import type { EventListDto } from '@/api/events/model.ts';
import { Skeleton } from '@/components/ui';

interface Props {
  className?: string;
  events: EventListDto[];
  isLoading?: boolean;
}

export const EventGroup: React.FC<Props> = ({
  className,
  events,
  isLoading,
}) => {

  return (
    <div
      className={cn(
        className,
        'grid grid-cols-3 max-[900px]:grid-cols-2 max-[528px]:grid-cols-1 gap-6',
      )}
    >
      {isLoading ? (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-[475px] rounded-2xl" />
          ))}
        </>
      ) : (
        <>
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              imageUrl={event.imageUrl}
              title={event.name}
              description={event.shortDescription}
              date={event.eventDate}
              startTime={event.startTime}
              endTime={event.endTime}
              location={`${event.space.building.name}, ${event.space.name}`}
              registered={event.participantQuantity}
              participants={event.space.capacity}
              author={event.author}
              category={event.category}
              isRegistered={event.isRegistered}
            />
          ))}
        </>
      )}
    </div>
  );
};
