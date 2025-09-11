import { EventCard } from '@/components/shared/event-card.tsx';
import * as React from 'react';
import { cn } from '@/lib/utils.ts';

interface Props {
  className?: string;
}

export const EventGroup: React.FC<Props> = ({className}) => {
  return (
    <div className={cn(className, 'grid grid-cols-3 max-[900px]:grid-cols-2 max-[528px]:grid-cols-1 gap-6')}>
      <EventCard/>
      <EventCard/>
      <EventCard/>
      <EventCard/>
      <EventCard/>
    </div>
  )
}