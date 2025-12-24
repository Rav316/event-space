import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { Api } from '@/src/api/api-client';
import { EVENT_KEYS } from '@/src/api/events/keys';
import { AxiosError } from 'axios';
import { EventPreviewFilter } from '@/src/api/events/models';

export const useConfirmAttendance = () => {
  return useMutation({
    mutationFn: Api.events.confirmAttendance,
    mutationKey: EVENT_KEYS.confirmAttendance,
    onSuccess: () => {

    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        console.error(error.response?.data);
      }
    }
  })
}

export const useEvents = (filter: EventPreviewFilter) => {
  return useInfiniteQuery({
    queryKey: EVENT_KEYS.all(filter),
    queryFn: ({pageParam = 0}) => Api.events.findAllByFilter(filter, pageParam),
    getNextPageParam: (lastPage) => {
      if(lastPage.metadata.hasNext) {
        return lastPage.metadata.page + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false
  })
}