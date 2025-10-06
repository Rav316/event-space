import { Wrapper } from '@/components/hoc';
import {
  EventCategories,
  EventGroup,
  EventSearch,
  EventsNotFound,
  EventsPagination,
} from '@/components/shared';
import { EventFilters } from '@/components/shared/event-filters.tsx';
import { useEventsByFilter } from '@/api/events/hooks.ts';
import { useEventFilterStore } from '@/store/use-event-filter-store.ts';
import { useEffect } from 'react';
import { usePaginationStore } from '@/store/use-pagination-store.ts';
import { useEventCategoriesWithEventCount } from '@/api/event-categories/hooks.ts';
import { Skeleton } from '@/components/ui';

const EventsPage = () => {
  const eventFilter = useEventFilterStore((state) => state.filter);
  const currentPage = usePaginationStore((state) => state.page);
  const totalPages = usePaginationStore((state) => state.totalPages);
  const setCurrentPage = usePaginationStore((state) => state.setPage);
  const setTotalPages = usePaginationStore((state) => state.setTotalPages);
  const { data: eventCategories, isPending: isEventCategoriesPending } =
    useEventCategoriesWithEventCount();

  const { data: events, isPending: isEventsPending } = useEventsByFilter({
    filter: { ...eventFilter },
    page: currentPage,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (!isEventsPending && events) {
      setTotalPages(
        Math.ceil(events.metadata.totalElements / events.metadata.size),
      );
    }
  }, [events, isEventsPending, setTotalPages]);

  console.log('events', events);
  console.log('eventsIsPending', isEventsPending);

  return (
    <Wrapper>
      <div className={'flex flex-col py-5 gap-y-5'}>
        <div className={'flex flex-col gap-y-2'}>
          <h1 className={'font-bold text-3xl'}>Все мероприятия</h1>
          <span>Найдите интересные события и зарегистрируйтесь на участие</span>
        </div>
        <EventCategories />
        <div className={'flex flex-col gap-y-2 leading-4'}>
          <span className={'font-medium'}>
            Поиск мероприятий по названию, описанию или автору...
          </span>
          <EventSearch />
        </div>
        <EventFilters />
        {!isEventsPending && events?.content.length === 0 ? (
          <EventsNotFound />
        ) : (
          <>
            {isEventCategoriesPending || isEventsPending ? (
              <Skeleton className={'h-[20px] w-[220px]'} />
            ) : (
              <span className={'text-muted-foreground text-sm'}>
                Найдено {events?.metadata.totalElements} из{' '}
                {eventCategories?.reduce(
                  (acc, category) => acc + category.eventCount,
                  0,
                )}{' '}
                мероприятий
              </span>
            )}
            <EventGroup
              isLoading={isEventsPending}
              events={events?.content || []}
            />
            <EventsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default EventsPage;
