import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useAuthModalStore = create<AuthModalState>()(
  devtools(
    immer((set) => ({
      isOpen: false,
      setIsOpen: (isOpen) => {
        set(
          (state) => {
            state.isOpen = isOpen;
          },
          false,
          'setIsOpen',
        );
      },
    })),
    {
      name: 'authModalStore',
      store: 'auth-modal-store',
    },
  ),
);
