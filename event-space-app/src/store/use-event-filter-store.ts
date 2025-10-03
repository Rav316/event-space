import type { EventFilter } from '@/api/events/model.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface EventFilterState {
  filter: EventFilter;
  setFilter: (filterData: Partial<EventFilter>) => void;
}

export const useEventFilterStore = create<EventFilterState>()(
  devtools(
    immer((set) => ({
      filter: {
        name: '',
        categories: [],
        tags: [],
        page: 0
      },
      setFilter: (filterData) =>
        set((state) => {
          Object.assign(state.filter, filterData);
        }, false, 'setFilter'),
    })),
    { name: 'eventFilterStore' },
  ),
);