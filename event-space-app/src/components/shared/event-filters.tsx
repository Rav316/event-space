import { CategoriesFilter } from '@/components/shared/categories-filter.tsx';
import { TagsFilter } from '@/components/shared/tags-filter.tsx';
import { Button } from '@/components/ui';
import { useState } from 'react';
import { Users } from 'lucide-react';
import { DateFilter } from '@/components/shared/date-filter.tsx';

export const EventFilters = () => {
  const [availableOnly, setAvailableOnly] = useState(false);

  return (
    <div className={'flex gap-2 max-[563px]:flex-col'}>
      <div className={'flex gap-2'}>
        <CategoriesFilter />
        <TagsFilter />
      </div>
      <div className={'flex gap-2'}>
        <Button
          variant={availableOnly ? 'default' : 'outline'}
          onClick={() => setAvailableOnly((prev) => !prev)}
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
