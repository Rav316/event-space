import { EventListItem } from '@/components/shared/event/event-list-item.tsx';
import { useEventFilterStore } from '@/store/use-event-filter-store.ts';
import { useEventsByFilter } from '@/api/events/hooks.ts';

export const EventList = () => {
  const eventFilter = useEventFilterStore((state) => state.filter);
  const { data, isPending } = useEventsByFilter({
    filter: eventFilter,
    page: 1,
  });

  if (isPending || !data) {
    return;
  }

  return (
    <div className={'flex flex-col gap-4'}>
      {data.content.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  );
};
