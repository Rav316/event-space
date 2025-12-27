import { useEventCreationStore } from '@/store/use-event-creation-store.ts';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { useEventImageStore } from '@/store/use-event-image-store.ts';
import { EVENTS_KEYS } from '@/api/events/keys.ts';
import { queryClient } from '@/api/query-client.ts';
import type {
  EventReviewFilter,
  EventReviewMyDto,
} from '@/api/event-reviews/model.ts';
import type { EventFilter, EventMyFilter, EventRequestData } from '@/api/events/model.ts';

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

export const useUpcomingEvents = (options?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: EVENTS_KEYS.upcoming,
    queryFn: ({ pageParam = 0 }) => Api.events.getMyUpcomingEvents(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.hasNext) {
        return lastPage.metadata.page + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    enabled: options?.enabled ?? true,
  });
};

export const useFinishedEvents = (options?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: EVENTS_KEYS.finished,
    queryFn: ({ pageParam = 0 }) => Api.events.getMyFinishedEvents(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.hasNext) {
        return lastPage.metadata.page + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    enabled: options?.enabled ?? true,
  });
};

export const useEventsByFilter = (eventRequestData: EventRequestData<EventFilter>) => {
  return useQuery({
    queryFn: () => Api.events.findAllByFilter(eventRequestData),
    queryKey: EVENTS_KEYS.filters(eventRequestData),
    refetchOnWindowFocus: false,
  });
};

export const useMyEventsByFilter = (eventRequestData: EventRequestData<EventMyFilter>) => {
  return useQuery({
    queryFn: () => Api.events.findAllMyEvents(eventRequestData),
    queryKey: EVENTS_KEYS.my(eventRequestData),
    refetchOnWindowFocus: false,
  })
}

export const useTagsStartWith = (prefix: string) => {
  return useQuery({
    queryFn: () => Api.events.findTagsStartWith(prefix),
    queryKey: EVENTS_KEYS.tags(prefix),
    refetchOnWindowFocus: false,
    enabled: !!prefix,
  });
};

export const useEventById = (eventId: number) => {
  return useQuery({
    queryFn: () => Api.events.findById(eventId),
    queryKey: EVENTS_KEYS.event(eventId),
    refetchOnWindowFocus: false,
  });
};

export const useStepsByEvent = (eventId: number) => {
  return useQuery({
    queryFn: () => Api.events.getStepsByEvent(eventId),
    queryKey: EVENTS_KEYS.steps(eventId),
    refetchOnWindowFocus: false,
  });
};

export const useEventReviews = (eventId: number, filter: EventReviewFilter) => {
  return useInfiniteQuery({
    queryKey: EVENTS_KEYS.reviews(eventId, filter),
    queryFn: ({ pageParam = 0 }) =>
      Api.events.getEventReviews(eventId, filter, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.hasNext) {
        return lastPage.metadata.page + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
  });
};

export const useMyReviewByEvent = (
  eventId: number,
  options?: Omit<
    UseQueryOptions<EventReviewMyDto, Error, EventReviewMyDto>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: EVENTS_KEYS.myReview(eventId),
    queryFn: () => Api.events.getMyReviewByEvent(eventId),
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useAddReview = () => {
  return useMutation({
    mutationFn: Api.events.addReviewForEvent,
    onSuccess: async () => {
      toast.success('Отзыв опубликован');
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'reviews',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error('Произошла ошибка при добавлении отзыва');
      }
    },
  });
};

export const useUpdateReview = () => {
  return useMutation({
    mutationFn: Api.events.editReviewForEvent,
    onSuccess: async () => {
      toast.success('Отзыв успешно изменён');
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'reviews',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error('Произошла ошибка при обновлении отзыва');
      }
    },
  });
};

export const useDeleteReview = () => {
  return useMutation({
    mutationFn: Api.events.deleteReviewForEvent,
    onSuccess: async () => {
      toast.success('Отзыв успешно удалён');
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'reviews',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error('Произошла ошибка при удалении отзыва');
      }
    },
  });
};

export const useReviewsStatisticsByEvent = (eventId: number) => {
  return useQuery({
    queryKey: EVENTS_KEYS.reviewsStatistics(eventId),
    queryFn: () => Api.events.getReviewsStatisticsByEvent(eventId),
    refetchOnWindowFocus: false,
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

export const useRemoveEvent = () => {
  return useMutation({
    mutationFn: Api.events.removeEvent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'events',
      });
      toast.success('Вы успешно удалили мероприятие')
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        toast.error('Произошла ошибка при удалении мероприятия')
      }
    }
  })
}