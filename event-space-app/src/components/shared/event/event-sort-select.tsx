import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui';
import { SortAsc } from 'lucide-react';
import { eventSortCategories } from '@/constants/event-sort-categories.ts';
import { useEventFilterStore } from '@/store/use-event-filter-store.ts';

export const EventSortSelect = () => {
  const filter = useEventFilterStore((state) => state.filter);
  const setFilter = useEventFilterStore((state) => state.setFilter);

  const currentLabel =
    eventSortCategories.find((item) => item.value === filter.sort)?.label ?? '';

  return (
    <Select
      value={filter.sort}
      onValueChange={(value) => setFilter({ sort: value })}
    >
      <SelectTrigger className="h-9 min-w-0 max-[703px]:flex-1">
        <SortAsc className="h-4 w-4 mr-2 shrink-0" />
        <span className="font-medium truncate min-w-0">{currentLabel}</span>
      </SelectTrigger>

      <SelectContent>
        {eventSortCategories.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
