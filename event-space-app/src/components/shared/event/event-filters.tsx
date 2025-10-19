import { Button } from '@/components/ui';
import { Users } from 'lucide-react';
import { useEventFilterStore } from '@/store/use-event-filter-store.ts';
import { CategoriesFilter, TagsFilter } from '@/components/shared';
import { EventPeriodSelect, EventSortSelect } from '@/components/shared/event';

export const EventFilters = () => {
  const filter = useEventFilterStore((state) => state.filter);
  const setFilter = useEventFilterStore((state) => state.setFilter);

  return (
    <div className={'flex gap-2 max-[703px]:flex-col'}>
      <div className={'flex gap-2'}>
        <CategoriesFilter />
        <TagsFilter />
      </div>
      <div className={'flex gap-2'}>
        <EventSortSelect />
        <EventPeriodSelect />
      </div>
      <Button
        variant={filter.hasPlaces ? 'default' : 'outline'}
        onClick={() => setFilter({ hasPlaces: !filter.hasPlaces })}
        className={'border-[1px] max-[703px]:flex-1'}
      >
        <Users />
        <span>Есть места</span>
      </Button>
    </div>
  );
};
