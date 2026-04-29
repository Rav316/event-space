import type { UserRegisterDto } from '@/api/users/model.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface RegistrationState {
  registrationData: UserRegisterDto;
  setRegistrationData: (data: Partial<UserRegisterDto>) => void;
  resetRegistrationData: () => void;
}

export const useRegistrationStore = create<RegistrationState>()(
  devtools(
    immer((set) => ({
      registrationData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      setRegistrationData: (data) => {
        set(
          (state) => {
            state.registrationData = {
              ...state.registrationData,
              ...data,
            };
          },
          false,
          'setRegistrationData',
        );
      },
      resetRegistrationData: () => {
        set(
          (state) => {
            state.registrationData = {
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            };
          },
          false,
          'resetRegistrationData',
        );
      },
    })),
    {
      store: 'registration-store',
    },
  ),
);
