import { useMutation } from '@tanstack/react-query';
import { Api } from '@/src/api/api-client';
import { EVENT_KEYS } from '@/src/api/events/keys';
import { AxiosError } from 'axios';

export const useConfirmAttendance = () => {
  return useMutation({
    mutationFn: Api.events.confirmAttendance,
    mutationKey: EVENT_KEYS.confirmAttendance,
    onSuccess: () => {

    },
    onError: (error) => {
      console.error('error', error);
      if(error instanceof AxiosError) {
        console.error(error.response?.data);
      }
    }
  })
}