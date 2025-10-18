import type { EventReviewFilter } from '@/api/event-reviews/model';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UseEventReviewFilterState {
  filter: EventReviewFilter;
  setFilter: (filter: Partial<EventReviewFilter>) => void;
}

export const useEventReviewFilterStore = create<UseEventReviewFilterState>()(
  devtools(
    immer((set) => ({
      filter: {},
      setFilter: (filterData) =>
        set(
          (state) => {
            Object.assign(state.filter, filterData);
          },
          false,
          'setFilter',
        ),
    })),
    {
      store: 'auth-modal',
    },
  ),
);
