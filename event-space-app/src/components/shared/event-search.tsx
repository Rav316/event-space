import { SearchInput } from '@/components/shared/search-input.tsx';
import { useEventFilterStore } from '@/store/use-event-filter-store.ts';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export const EventSearch = () => {
  const eventFilter = useEventFilterStore((state) => state.filter);
  const setEventFilter = useEventFilterStore((state) => state.setFilter);

  const [inputValue, setInputValue] = useState(eventFilter.name);
  const [debouncedValue] = useDebounce(inputValue, 300);

  useEffect(() => {
    setEventFilter({ name: debouncedValue });
  }, [debouncedValue, setEventFilter]);

  useEffect(() => {
    setInputValue(eventFilter.name);
  }, [eventFilter.name]);

  return (
    <div className="relative w-full">
      <SearchInput
        placeholder="Введите текст..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};
