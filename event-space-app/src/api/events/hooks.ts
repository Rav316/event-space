import { useEventCreationStore } from '@/store/use-event-creation-store.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { useEventImageStore } from '@/store/use-event-image-store.ts';
import { EVENTS_KEYS } from '@/api/events/keys.ts';
import type { EventRequestData } from '@/api/events/model.ts';
import { queryClient } from '@/api/query-client.ts';

export const useEventCreate = () => {
  const navigate = useNavigate();
  const resetEvent = useEventCreationStore((state) => state.resetEvent);
  const resetEventSteps = useEventCreationStore(
    (state) => state.resetEventSteps,
  );
  const clearImage = useEventImageStore((state) => state.clearImage);

  return useMutation({
    mutationFn: Api.events.create,
    onSuccess: () => {
      resetEvent();
      resetEventSteps();
      clearImage();

      toast.success('Вы успешно создали мероприятие');
      setTimeout(() => navigate('/'), 0);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error('Произошла ошибка при создании мероприятия');
      }
    },
  });
};

export const useActualEvents = () => {
  return useQuery({
    queryFn: Api.events.getActualEvents,
    queryKey: EVENTS_KEYS.actual,
  });
};

export const useEventsByFilter = (eventRequestData: EventRequestData) => {
  return useQuery({
    queryFn: () => Api.events.findAllByFilter(eventRequestData),
    queryKey: EVENTS_KEYS.filters(eventRequestData),
    refetchOnWindowFocus: false,
  });
};

export const useTagsStartWith = (prefix: string) => {
  return useQuery({
    queryFn: () => Api.events.findTagsStartWith(prefix),
    queryKey: EVENTS_KEYS.tags(prefix),
    refetchOnWindowFocus: false,
    enabled: !!prefix,
  });
};

export const useRegisterForEvent = (eventId: number) => {
  return useMutation({
    mutationFn: () => Api.events.registerForEvent(eventId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'events',
      });
      toast.success('Вы успешно зарегистрировались на мероприятие');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error('Произошла ошибка при регистрации на мероприятие');
      }
    },
  });
};

export const useUnregisterFromEvent = (eventId: number) => {
  return useMutation({
    mutationFn: () => Api.events.unregisterFromEvent(eventId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'events',
      });
      toast.success('Вы успешно отменили регистрацию на мероприятие');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error('Произошла ошибка при отмене регистрации на мероприятие');
      }
    },
  });
};
