import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui';
import { ClockArrowUp } from 'lucide-react';
import { eventPeriods } from '@/constants/event-periods.ts';
import { useEventFilterStore } from '@/store/use-event-filter-store.ts';

export const EventPeriodSelect = () => {
  const filter = useEventFilterStore((state) => state.filter);
  const setFilter = useEventFilterStore((state) => state.setFilter);

  const currentLabel =
    eventPeriods.find((item) => item.value === filter.period)?.label ?? '';

  return (
    <Select value={filter.period} onValueChange={(value) => setFilter({ period: value })}>
      <SelectTrigger className="h-9 min-w-0 max-[703px]:flex-1">
        <ClockArrowUp className="h-4 w-4 mr-2" />
        <span className="font-medium">{currentLabel}</span>
      </SelectTrigger>

      <SelectContent>
        {eventPeriods.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
