import { Wrapper } from '@/components/hoc';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from '@/components/ui';
import { SearchInput } from '@/components/shared';
import { MyEventsStatisticBlock } from '@/components/shared/my-events';
import { useEventCategories } from '@/api/event-categories/hooks.ts';
import { MyEventsGroup } from '@/components/shared/my-events/my-events-group.tsx';
import { useMyEventsByFilter } from '@/api/events/hooks.ts';
import { useMyEventsFilterStore } from '@/store/use-my-event-filter-store.ts';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { EventsNotFound, EventsPagination } from '@/components/shared/event';
import { useEventAuthoredStatistics } from '@/api/statistics/hooks.ts';

const MyEventsPage = () => {
  const { data: categories, isPending: isCategoriesPending } =
    useEventCategories();

  const { data: statistics, isPending: isStatisticsPending } =
    useEventAuthoredStatistics();

  const filter = useMyEventsFilterStore((state) => state.filter);
  const currentPage = useMyEventsFilterStore((state) => state.page);
  const setCurrentPage = useMyEventsFilterStore((state) => state.setPage);
  const setName = useMyEventsFilterStore((state) => state.setName);
  const changeCategory = useMyEventsFilterStore(
    (state) => state.changeCategory,
  );
  const { data: events, isPending: isEventsPending } = useMyEventsByFilter({
    filter,
    page: currentPage,
  });

  const [searchValue, setSearchValue] = useState(filter.name || '');
  const [debouncedSearch] = useDebounce(searchValue, 200);

  useEffect(() => {
    setName(debouncedSearch);
  }, [debouncedSearch, setName]);

  useEffect(() => {
    setSearchValue(filter.name || '');
  }, [filter.name]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <Wrapper className={'mt-5 flex flex-col gap-y-5 mb-5'}>
      <div className={'flex flex-col '}>
        <h1 className={'font-bold text-3xl'}>Мои мероприятия</h1>
        <span className={'text-muted-foreground'}>
          Управляйте опубликованными мероприятиями
        </span>
      </div>
      <div className={'flex gap-3 max-[400px]:flex-col max-[400px]:gap-y-2'}>
        {isStatisticsPending || !statistics ? (
          <>
            <Skeleton className={'h-[90px] flex-1'} />
            <Skeleton className={'h-[90px] flex-1'} />
          </>
        ) : (
          <>
            <MyEventsStatisticBlock
              label={'Опубликованных мероприятий'}
              value={statistics.createdEvents.toString()}
            />
            <MyEventsStatisticBlock
              label={'Всего участников'}
              value={statistics.totalParticipants.toString()}
            />
          </>
        )}
      </div>
      <div className="flex gap-5 border border-[#E5E5E5] rounded-2xl p-4 max-[515px]:flex-col max-[515px]:items-start max-[515px]:gap-y-3 max-[400px]:p-3">
        <div className="flex-1 max-[515px]:w-full">
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Поиск по названию..."
          />
        </div>
        <div className="flex-1 max-[515px]:w-full">
          {isCategoriesPending ? (
            <Skeleton className={'w-full h-8'} />
          ) : (
            <Select
              value={filter.category?.toString()}
              onValueChange={(value) => changeCategory(Number(value))}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      {!isEventsPending && events?.content.length === 0 ? (
        <EventsNotFound />
      ) : (
        <>
          <MyEventsGroup
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
    </Wrapper>
  );
};
export default MyEventsPage;
