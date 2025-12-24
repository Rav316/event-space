import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface EventFilterState {
  name?: string;
  categories: number[];
  sort?: string;
  period?: string;
  setName: (name: string) => void;
  addCategory: (category: number) => void;
  removeCategory: (category: number) => void;
  setSort: (sort: string) => void;
  setPeriod: (period: string) => void;
}

export const useEventFilterStore = create<EventFilterState>()(
  immer((set) => ({
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
