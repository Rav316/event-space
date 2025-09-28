import { create } from 'zustand';
import type { SpaceFilter } from '@/api/spaces/model.ts';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface SpaceFilterStore {
  filter: SpaceFilter;
  setFilter: (filterData: Partial<SpaceFilter>) => void;
}

export const useSpaceFilterStore = create<SpaceFilterStore>()(
  devtools(
    immer((set) => ({
      filter: {
        building: 0,
      },
      setFilter: (filterData) =>
        set((state) => {
          Object.assign(state.filter, filterData);
        }),
    })),
    { name: 'spaceFilterStore' },
  ),
);