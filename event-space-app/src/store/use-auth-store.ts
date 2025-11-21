import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  removeTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    immer((set) => ({
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
      setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        set(
          (state) => {
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
          },
          false,
          'setToken',
        );
      },
      removeTokens: () => {
        console.log('removing tokens');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set(
          (state) => {
            state.accessToken = null;
          },
          false,
          'removeTokens',
        );
      },
    })),
    {
      store: 'auth-store',
    },
  ),
);
