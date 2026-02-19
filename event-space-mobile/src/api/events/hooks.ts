import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { Api } from '@/src/api/api-client';
import { EVENT_KEYS } from '@/src/api/events/keys';
import { AxiosError } from 'axios';
import { EventPreviewFilter } from '@/src/api/events/models';
import { EventReviewFilter } from '@/src/api/event-reviews/model';

export const useConfirmAttendance = () => {
  return useMutation({
    mutationFn: Api.events.confirmAttendance,
    mutationKey: EVENT_KEYS.confirmAttendance,
    onSuccess: () => {},
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
      }
    }
  });
};

export const useEvents = (filter: EventPreviewFilter) => {
  return useInfiniteQuery({
    queryKey: EVENT_KEYS.preview(filter),
    queryFn: ({ pageParam = 0 }) =>
      Api.events.findAllByFilter(filter, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.hasNext) {
        return lastPage.metadata.page + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false
  });
};

export const useEventById = (eventId: number) => {
  return useQuery({
    queryFn: () => Api.events.findById(eventId),
    queryKey: EVENT_KEYS.byId(eventId),
    refetchOnWindowFocus: false
  });
};

export const useStepsByEvent = (eventId: number) => {
  return useQuery({
    queryFn: () => Api.events.getStepsByEvent(eventId),
    queryKey: EVENT_KEYS.steps(eventId),
    refetchOnWindowFocus: false
  });
};

export const useEventReviews = (eventId: number, filter: EventReviewFilter) => {
  return useInfiniteQuery({
    queryKey: EVENT_KEYS.reviews(eventId, filter),
    queryFn: ({ pageParam = 0 }) =>
      Api.events.getEventReviews(eventId, filter, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.hasNext) {
        return lastPage.metadata.page + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false
  });
};

export const useReviewsStatisticsByEvent = (eventId: number) => {
  return useQuery({
    queryKey: EVENT_KEYS.reviewsStatistics(eventId),
    queryFn: () => Api.events.getReviewsStatisticsByEvent(eventId),
    refetchOnWindowFocus: false
  });
};