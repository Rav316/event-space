import { CategoriesFilter } from '@/components/shared/categories-filter.tsx';
import { TagsFilter } from '@/components/shared/tags-filter.tsx';
import { Button } from '@/components/ui';
import { Users } from 'lucide-react';
import { DateFilter } from '@/components/shared/date-filter.tsx';
import { useEventFilterStore } from '@/store/use-event-filter-store.ts';

export const EventFilters = () => {
  const filter = useEventFilterStore((state) => state.filter);
  const setFilter = useEventFilterStore((state) => state.setFilter);

  return (
    <div className={'flex gap-2 max-[563px]:flex-col'}>
      <div className={'flex gap-2'}>
        <CategoriesFilter />
        <TagsFilter />
      </div>
      <div className={'flex gap-2'}>
        <Button
          variant={filter.hasPlaces ? 'default' : 'outline'}
          onClick={() => setFilter({ hasPlaces: !filter.hasPlaces })}
          className={'border-[1px] max-[563px]:flex-1'}
        >
          <Users />
          <span>Есть места</span>
        </Button>
        <DateFilter />
      </div>
    </div>
  );
};
