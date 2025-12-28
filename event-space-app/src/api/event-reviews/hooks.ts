import {
  type InfiniteData,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { queryClient } from '@/api/query-client.ts';
import type {
  EventReviewFilter,
  EventReviewReadDto,
} from '@/api/event-reviews/model.ts';
import { EVENTS_KEYS } from '@/api/events/keys.ts';
import type { SliceResponse } from '@/api/model.ts';
import { EVENT_REVIEWS_KEYS } from '@/api/event-reviews/keys.ts';

export const useReviews = (filter: EventReviewFilter) => {
  return useInfiniteQuery({
    queryKey: EVENT_REVIEWS_KEYS.all(filter),
    queryFn: ({ pageParam = 0 }) =>
      Api.eventReviews.findAllReviews(filter, pageParam),
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

export const useMarkReviewAsHelpful = (
  eventId: number,
  filter: EventReviewFilter,
) =>
  useMutation({
    mutationFn: Api.eventReviews.markReviewAsHelpful,
    onSuccess: (_, reviewId) => {
      const updater = (r: EventReviewReadDto) => ({
        ...r,
        helpfulMarks: r.helpfulMarks + 1,
        userMarkedHelpful: true,
      });

      updateReviewInList(eventId, filter, reviewId, updater);
      updateMyReview(eventId, updater);
    },
  });

export const useUnmarkReviewAsHelpful = (
  eventId: number,
  filter: EventReviewFilter,
) =>
  useMutation({
    mutationFn: Api.eventReviews.unmarkReviewAsHelpful,
    onSuccess: (_, reviewId) => {
      const updater = (r: EventReviewReadDto) => ({
        ...r,
        helpfulMarks: Math.max(0, r.helpfulMarks - 1),
        userMarkedHelpful: false,
      });

      updateReviewInList(eventId, filter, reviewId, updater);
      updateMyReview(eventId, updater);
    },
  });

const updateReviewInList = (
  eventId: number,
  filter: EventReviewFilter,
  reviewId: number,
  updater: (r: EventReviewReadDto) => EventReviewReadDto,
) => {
  queryClient.setQueryData(
    EVENTS_KEYS.reviews(eventId, filter),
    (oldData?: InfiniteData<SliceResponse<EventReviewReadDto>>) =>
      oldData
        ? {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              content: page.content.map((review) =>
                review.id === reviewId ? updater(review) : review,
              ),
            })),
          }
        : oldData,
  );
};

const updateMyReview = (
  eventId: number,
  updater: (r: EventReviewReadDto) => EventReviewReadDto,
) => {
  queryClient.setQueryData(
    EVENTS_KEYS.myReview(eventId),
    (oldData?: EventReviewReadDto) => (oldData ? updater(oldData) : oldData),
  );
};
