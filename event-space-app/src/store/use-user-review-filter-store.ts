import type { EventReviewFilter } from '@/api/event-reviews/model.ts';
import { create } from 'zustand/index';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { reviewSortValues } from '@/constants/review-sort-values.ts';

interface UserReviewFilterState {
  filter: EventReviewFilter;
  setSort: (sort: string) => void;
}

export const useUserReviewFilterStore = create<UserReviewFilterState>()(
  devtools(
    immer((set) => ({
      filter: {
        sort: reviewSortValues[0].value,
      },
      setSort: (sort) =>
        set(
          (state) => {
            state.filter.sort = sort;
          },
          false,
          'setSort',
        ),
    })),
    {
      store: 'auth-modal',
    },
  ),
);
