import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { eventSortCategories } from '@/src/constants/event-sort-categories';
import { eventPeriods } from '@/src/constants/event-periods';

interface EventFilterState {
  name?: string;
  categories: number[];
  sort: string;
  period: string;
  setName: (name: string) => void;
  addCategory: (category: number) => void;
  removeCategory: (category: number) => void;
  setSort: (sort: string) => void;
  setPeriod: (period: string) => void;
}

export const useEventFilterStore = create<EventFilterState>()(
  immer((set) => ({
    sort: eventSortCategories[0].value,
    period: eventPeriods[0].value,
    categories: [],
    setName: (name) => set({ name }),
    addCategory: (category) =>
      set((state) => ({ categories: [...(state.categories || []), category] })),
    removeCategory: (category) =>
      set((state) => ({
        categories: state.categories?.filter((c) => c !== category)
      })),
    setSort: (sort) => set({ sort }),
    setPeriod: (period) => set({ period })
  }))
);
