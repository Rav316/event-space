import type { EventListMyDto } from '@/api/events/model.ts';
import * as React from 'react';
import { cn } from '@/lib/utils.ts';
import { Skeleton } from '@/components/ui';
import { MyEventCard } from '@/components/shared/my-events/my-event-card.tsx';

interface Props {
  className?: string;
  events: EventListMyDto[];
  isLoading?: boolean;
}

export const MyEventsGroup: React.FC<Props> = ({
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
            <MyEventCard key={event.id} event={event} />
          ))}
        </>
      )}
    </div>
  );
};
