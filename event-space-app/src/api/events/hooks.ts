import { useEventCreationStore } from '@/store/use-event-creation-store.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { useEventImageStore } from '@/store/use-event-image-store.ts';
import { EVENTS_KEYS } from '@/api/events/keys.ts';
import type { EventRequestData } from '@/api/events/model.ts';

export const useEventCreate = () => {
  const navigate = useNavigate();
  const resetEvent = useEventCreationStore((state) => state.resetEvent);
  const resetEventSteps = useEventCreationStore(
    (state) => state.resetEventSteps,
  );
  const clearImage = useEventImageStore((state) => state.clearImage)

  return useMutation({
    mutationFn: Api.events.create,
    onSuccess: () => {
      toast.success('Вы успешно создали мероприятие');
      navigate('/')
      resetEvent();
      resetEventSteps();
      clearImage();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error('Произошла ошибка при создании мероприятия');
      }
    }
  });
};

export const useActualEvents = () => {
  return useQuery({
    queryFn: Api.events.getActualEvents,
    queryKey: EVENTS_KEYS.actual
  })
}

export const useEventsByFilter = (eventRequestData: EventRequestData) => {
  return useQuery({
    queryFn: () => Api.events.findAllByFilter(eventRequestData),
    queryKey: EVENTS_KEYS.filters(eventRequestData),
    refetchOnWindowFocus: false
  })
}