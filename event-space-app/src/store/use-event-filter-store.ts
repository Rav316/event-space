import type { EventFilter } from '@/api/events/model.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface EventFilterStore {
  filter: EventFilter;
  setFilter: (filterData: Partial<EventFilter>) => void;
}

export const useEventFilterStore = create<EventFilterStore>()(
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