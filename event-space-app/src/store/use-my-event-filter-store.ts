import type { EventMyFilter } from '@/api/events/model.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface MyEventsFilterState {
  filter: EventMyFilter;
  setName: (name: string) => void;
  changeCategory: (category: number) => void;
  page: number;
  setPage: (page: number) => void;
}

export const useMyEventsFilterStore = create<MyEventsFilterState>()(
  devtools(
    immer((set) => ({
      filter: {
        name: '',
      },
      page: 0,

      setName: (name) =>
        set((state) => {
          state.filter.name = name;
          state.page = 0;
        }),
      changeCategory: (category) =>
        set((state) => {
          state.filter.category = category;
          state.page = 0;
        }),

      setPage: (page) =>
        set(
          (state) => {
            state.page = page;
          },
          false,
          'setPage',
        ),
    })),
    { name: 'myEventsFilterStore' },
  ),
);
