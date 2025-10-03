import type { EventFilter } from '@/api/events/model.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface EventFilterState {
  filter: EventFilter;
  setFilter: (filterData: Partial<EventFilter>) => void;
  addCategory: (category: number) => void;
  removeCategory: (category: number) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
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
      addCategory: (category) =>
        set((state) => {
          state.filter.categories?.push(category);
        }, false, 'addCategory'),
      removeCategory: (category) =>
        set((state) => {
          state.filter.categories = state.filter.categories?.filter((c) => c !== category);
        }, false, 'removeCategory'),
      addTag: (tag) =>
        set((state) => {
          state.filter.tags?.push(tag);
        }, false, 'addTag'),
      removeTag: (tag) =>
        set((state) => {
          state.filter.tags = state.filter.tags?.filter((t) => t !== tag);
        }, false, 'removeTag'),
    })),
    { name: 'eventFilterStore' },
  ),
);