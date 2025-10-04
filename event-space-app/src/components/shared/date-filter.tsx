import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { SortAsc } from 'lucide-react';
import { eventSortCategories } from '@/constants/event-sort-categories.ts';
import { useEventFilterStore } from '@/store/use-event-filter-store.ts';

export const DateFilter = () => {
  // const [sortBy, setSortBy] = useState(eventSortCategories[0].value);
  const filter = useEventFilterStore((state) => state.filter);
  const setFilter = useEventFilterStore((state) => state.setFilter);

  return (
    <Select
      value={filter.sort}
      onValueChange={(value) => setFilter({ sort: value })}
    >
      <SelectTrigger className="h-9 min-w-0 max-[563px]:flex-1">
        <SortAsc className="h-4 w-4 mr-2" />
        <SelectValue />
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
