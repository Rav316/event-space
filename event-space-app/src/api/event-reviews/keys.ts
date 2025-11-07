import type { EventReviewFilter } from '@/api/event-reviews/model.ts';

export const EVENT_REVIEWS_KEYS = {
  all: (filter: EventReviewFilter) => ['event-reviews', filter] as const,
}