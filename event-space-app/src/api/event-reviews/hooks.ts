import { type InfiniteData, useMutation } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { queryClient } from '@/api/query-client.ts';
import type {
  EventReviewFilter,
  EventReviewReadDto,
} from '@/api/event-reviews/model.ts';
import { EVENTS_KEYS } from '@/api/events/keys.ts';
import type { SliceResponse } from '@/api/model.ts';

export const useMarkReviewAsHelpful = (
  eventId: number,
  filter: EventReviewFilter,
) => {
  return useMutation({
    mutationFn: Api.eventReviews.markReviewAsHelpful,
    onSuccess: (_, reviewId) => {
      queryClient.setQueryData(
        EVENTS_KEYS.reviews(eventId, filter),
        (
          oldData:
            | InfiniteData<SliceResponse<EventReviewReadDto>, unknown>
            | undefined,
        ) => {
          if (!oldData) {
            return oldData;
          }
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              content: page.content.map((review) =>
                review.id === reviewId
                  ? {
                      ...review,
                      helpfulMarks: review.helpfulMarks + 1,
                      userMarkedHelpful: true,
                    }
                  : review,
              ),
            })),
          };
        },
      );
    },
  });
};

export const useUnmarkReviewAsHelpful = (
  eventId: number,
  filter: EventReviewFilter,
) => {
  return useMutation({
    mutationFn: Api.eventReviews.unmarkReviewAsHelpful,
    onSuccess: (_, reviewId) => {
      queryClient.setQueryData(
        EVENTS_KEYS.reviews(eventId, filter),
        (
          oldData:
            | InfiniteData<SliceResponse<EventReviewReadDto>, unknown>
            | undefined,
        ) => {
          if (!oldData) {
            return oldData;
          }
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              content: page.content.map((review) =>
                review.id === reviewId
                  ? {
                      ...review,
                      helpfulMarks: Math.max(0, review.helpfulMarks - 1),
                      userMarkedHelpful: false,
                    }
                  : review,
              ),
            })),
          };
        },
      );
    },
  });
};
