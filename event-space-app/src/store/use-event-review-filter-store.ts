import type { EventReviewFilter } from '@/api/event-reviews/model';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { reviewSortValues } from '@/constants/review-sort-values.ts';

interface UseEventReviewFilterState {
  filter: EventReviewFilter;
  setFilter: (filter: Partial<EventReviewFilter>) => void;
}

export const useEventReviewFilterStore = create<UseEventReviewFilterState>()(
  devtools(
    immer((set) => ({
      filter: {
        sort: reviewSortValues[0].value
      },
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
