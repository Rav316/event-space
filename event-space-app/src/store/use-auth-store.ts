import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthStore {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    immer((set) => ({
      token: localStorage.getItem('token'),
      setToken: (token) => {
        localStorage.setItem('token', token);

        set(
          (state) => {
            state.token = token;
          },
          false,
          'setToken',
        );
      },
      removeToken: () => {
        console.log('removing token');
        localStorage.removeItem('token');
        set(
          (state) => {
            state.token = null;
          },
          false,
          'removeToken',
        );
      },
    })),
    {
      store: 'auth-store',
    },
  ),
);
