import { EventListItem } from '@/components/shared/event/event-list-item.tsx';
import React from 'react';
import type { EventListForUserDto } from '@/api/events/model.ts';
import { Skeleton } from '@/components/ui';

interface Props {
  events: EventListForUserDto[];
  isLoading: boolean;
}

export const EventList: React.FC<Props> = ({ events, isLoading }) => {
  return (
    <div className={'flex flex-col gap-4'}>
      {isLoading ? (
        <div className={'flex flex-col gap-4'}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className={'w-full h-[197px] rounded-2xl'} />
          ))}
        </div>
      ) : (
        <>
          {events.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))}
        </>
      )}
    </div>
  );
};
