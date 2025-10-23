import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface MyRegistrationsState {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
}

export const useMyRegistrationsStore = create<MyRegistrationsState>()(
  devtools(
    immer((set) => ({
      activeTabIndex: 0,
      setActiveTabIndex: (index: number) => {
        set({ activeTabIndex: index });
      },
    })),
    {
      name: 'myRegistrationsStore',
      store: 'my-registrations-store',
    },
  ),
);
