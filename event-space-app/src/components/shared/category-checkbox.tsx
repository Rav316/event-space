import { useDelayedToggle } from '@/hooks/use-delayed-toggle';
import { useEventFilterStore } from '@/store/use-event-filter-store';
import React from 'react';
import { Badge, Checkbox, Label } from '@/components/ui';

type CategoryCheckboxProps = {
  id: number;
  name: string;
  count: number;
};

export const CategoryCheckbox: React.FC<CategoryCheckboxProps> = ({ id, name, count }) => {
  const filter = useEventFilterStore((state) => state.filter);
  const addCategory = useEventFilterStore((state) => state.addCategory);
  const removeCategory = useEventFilterStore((state) => state.removeCategory);

  const { localSelected, toggle } = useDelayedToggle({
    selected: !!filter.categories?.includes(id),
    onCommit: (next) => {
      if (next) addCategory(id);
      else removeCategory(id);
    },
  });

  return (
    <div className={'flex items-center justify-between'}>
      <div className={'flex justify-between items-center gap-2 w-full'}>
        <div className={'flex items-center gap-2'}>
          <Checkbox id={name} checked={localSelected} onCheckedChange={toggle} />
          <Label htmlFor={name}>{name}</Label>
        </div>
        <Badge variant={'outline'} className={'text-xs'}>
          {count}
        </Badge>
      </div>
    </div>
  );
};