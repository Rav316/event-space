import { Wrapper } from '@/components/hoc';
import {
  EventCategories,
  EventGroup,
  EventsPagination,
  SearchInput,
} from '@/components/shared';
import { EventFilters } from '@/components/shared/event-filters.tsx';
import { useEvents } from '@/api/events/hooks.ts';
import { useEventFilterStore } from '@/store/use-event-filter-store.ts';

const EventsPage = () => {
  const eventFilter = useEventFilterStore((state) => state.filter);

  const {data, isPending} = useEvents(eventFilter);

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
          <div className={'relative w-full'}>
            <SearchInput placeholder={'Введите текст...'} />
          </div>
        </div>
        <EventFilters />
        <span className={'text-muted-foreground text-sm'}>
          Найдено 12 из 12 мероприятий
        </span>
        <EventGroup isLoading={isPending} events={data?.content || []} />
        <EventsPagination />
      </div>
    </Wrapper>
  );
};

export default EventsPage;
