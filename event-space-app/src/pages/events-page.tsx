import { Wrapper } from '@/components/hoc';
import { useEventsByFilter } from '@/api/events/hooks.ts';
import { useEventFilterStore } from '@/store/use-event-filter-store.ts';
import { useEffect } from 'react';
import { useEventCategoriesWithEventCount } from '@/api/event-categories/hooks.ts';
import { useMe } from '@/api/auth/hooks.ts';
import { Skeleton } from '@/components/ui';
import {
  EventCategories,
  EventFilters,
  EventGroup,
  EventSearch,
  EventsNotFound,
  EventsPagination,
} from '@/components/shared/event';

const EventsPage = () => {
  const eventFilter = useEventFilterStore((state) => state.filter);
  const currentPage = useEventFilterStore((state) => state.page);
  const setCurrentPage = useEventFilterStore((state) => state.setPage);
  const { data: eventCategories, isPending: isEventCategoriesPending } =
    useEventCategoriesWithEventCount();

  const { data: meData } = useMe();
  const preferredCategoryIds = meData?.user?.program?.preferredCategoryIds;

  const { data: events, isPending: isEventsPending } = useEventsByFilter({
    filter: {
      ...eventFilter,
      preferredCategoryIds: preferredCategoryIds?.length ? preferredCategoryIds : undefined,
    },
    page: currentPage,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <Wrapper>
      <div className={'flex flex-col py-5 gap-y-5'}>
        <div className={'flex flex-col'}>
          <h1 className={'font-semibold text-3xl'}>Все мероприятия</h1>
          <span className={'text-muted-foreground'}>
            Найдите интересные события и зарегистрируйтесь на участие
          </span>
        </div>
        <EventCategories />
        <div className={'flex flex-col gap-y-2'}>
          <EventSearch />
          <EventFilters />
        </div>
        {!isEventsPending && events?.content.length === 0 ? (
          <EventsNotFound />
        ) : (
          <>
            {isEventCategoriesPending || isEventsPending ? (
              <Skeleton className={'h-5 w-[220px]'} />
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
            {events && (
              <EventsPagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  events.metadata.totalElements / events.metadata.size,
                )}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default EventsPage;
