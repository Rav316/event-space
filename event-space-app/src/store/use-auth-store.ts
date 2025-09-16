import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthStore {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    immer((set) => ({
      token: localStorage.getItem('token'),
      setToken: (token) => {
        if (token) {
          localStorage.setItem('token', token)
        }
        else {
          localStorage.removeItem('token')
        }

        set((state) => {
          state.token = token;
        }, false, 'setToken');
      },
    })), {
      store: 'auth-store'
    }
  )
);