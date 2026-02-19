import { InfiniteData, useMutation } from '@tanstack/react-query';
import { Api } from '@/src/api/api-client';
import { queryClient } from '@/src/api/queryClient';
import { EVENT_KEYS } from '@/src/api/events/keys';
import { EventReviewFilter, EventReviewReadDto } from '@/src/api/event-reviews/model';
import { SliceResponse } from '@/src/api/model';

type ReviewsData = InfiniteData<SliceResponse<EventReviewReadDto>>;

const updateReviewInList = (
  eventId: number,
  filter: EventReviewFilter,
  reviewId: number,
  updater: (review: EventReviewReadDto) => EventReviewReadDto
): ReviewsData | undefined => {
  const queryKey = EVENT_KEYS.reviews(eventId, filter);
  const prev = queryClient.getQueryData<ReviewsData>(queryKey);

  if (!prev) return undefined;

  queryClient.setQueryData<ReviewsData>(queryKey, {
    ...prev,
    pages: prev.pages.map((page) => ({
      ...page,
      content: page.content.map((review) =>
        review.id === reviewId ? updater(review) : review
      )
    }))
  });

  return prev;
};

export const useMarkReviewAsHelpful = (
  eventId: number,
  filter: EventReviewFilter
) => {
  return useMutation({
    mutationFn: Api.eventReviews.markReviewAsHelpful,
    onMutate: async (reviewId: number) => {
      await queryClient.cancelQueries({
        queryKey: EVENT_KEYS.reviews(eventId, filter)
      });

      const prev = updateReviewInList(eventId, filter, reviewId, (review) => ({
        ...review,
        helpfulMarks: review.helpfulMarks + 1,
        userMarkedHelpful: true
      }));

      return { prev };
    },
    onError: (_error, _reviewId, context) => {
      if (context?.prev) {
        queryClient.setQueryData(
          EVENT_KEYS.reviews(eventId, filter),
          context.prev
        );
      }
    }
  });
};

export const useUnmarkReviewAsHelpful = (
  eventId: number,
  filter: EventReviewFilter
) => {
  return useMutation({
    mutationFn: Api.eventReviews.unmarkReviewAsHelpful,
    onMutate: async (reviewId: number) => {
      await queryClient.cancelQueries({
        queryKey: EVENT_KEYS.reviews(eventId, filter)
      });

      const prev = updateReviewInList(eventId, filter, reviewId, (review) => ({
        ...review,
        helpfulMarks: review.helpfulMarks - 1,
        userMarkedHelpful: false
      }));

      return { prev };
    },
    onError: (_error, _reviewId, context) => {
      if (context?.prev) {
        queryClient.setQueryData(
          EVENT_KEYS.reviews(eventId, filter),
          context.prev
        );
      }
    }
  });
};
