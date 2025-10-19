import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface PaginationState {
  page: number;
  totalElements: number;
  totalPages: number;

  setPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
  setResponse: (metadata: { page: number; totalElements: number }) => void;
}

export const usePaginationStore = create<PaginationState>()(
  devtools(
    immer((set) => ({
      page: 0,
      totalElements: 0,
      totalPages: 0,

      setPage: (page) =>
        set(
          (state) => {
            state.page = page;
          },
          false,
          'setPage',
        ),

      setTotalPages: (totalPages) =>
        set(
          (state) => {
            state.totalPages = totalPages;
          },
          false,
          'setTotalPages',
        ),

      setResponse: (metadata) =>
        set((state) => {
          state.page = metadata.page;
          state.totalElements = metadata.totalElements;
        }),
    })),
    { name: 'paginationStore', store: 'pagination-store' },
  ),
);
