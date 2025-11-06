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
  page: number;
  setPage: (page: number) => void;
}

export const useEventFilterStore = create<EventFilterState>()(
  devtools(
    immer((set) => ({
      filter: {
        name: '',
        categories: [],
        tags: [],
        sort: 'date',
        period: 'all',
      },
      page: 0,

      setFilter: (filterData) =>
        set(
          (state) => {
            Object.assign(state.filter, filterData);
            state.page = 0;
          },
          false,
          'setFilter',
        ),

      addCategory: (category) =>
        set(
          (state) => {
            if (!state.filter.categories.includes(category)) {
              state.filter.categories.push(category);
              state.page = 0;
            }
          },
          false,
          'addCategory',
        ),

      removeCategory: (category) =>
        set(
          (state) => {
            state.filter.categories = state.filter.categories.filter(
              (c) => c !== category,
            );
            state.page = 0;
          },
          false,
          'removeCategory',
        ),

      addTag: (tag) =>
        set(
          (state) => {
            if (!state.filter.tags.includes(tag)) {
              state.filter.tags.push(tag);
              state.page = 0;
            }
          },
          false,
          'addTag',
        ),

      removeTag: (tag) =>
        set(
          (state) => {
            state.filter.tags = state.filter.tags.filter((t) => t !== tag);
            state.page = 0;
          },
          false,
          'removeTag',
        ),

      setPage: (page) =>
        set(
          (state) => {
            state.page = page;
          },
          false,
          'setPage',
        ),
    })),
    { name: 'eventFilterStore' },
  ),
);
