import type { EventRequestData } from '@/api/events/model.ts';
import type { EventReviewFilter } from '@/api/event-reviews/model.ts';

export const EVENTS_KEYS = {
  all: ['events'] as const,
  actual: ['events', 'actual'] as const,
  upcoming: ['events', 'upcoming'] as const,
  finished: ['events', 'finished'] as const,
  filters: (eventRequestData: EventRequestData) =>
    [
      ...EVENTS_KEYS.all,
      eventRequestData.filter,
      eventRequestData.page,
    ] as const,
  tags: (prefix: string) => ['tags', prefix] as const,
  event: (eventId: number) => [...EVENTS_KEYS.all, eventId] as const,
  statistics: ['events', 'statistics'] as const,
  steps: (eventId: number) => [eventId, 'steps'] as const,
  reviews: (eventId: number, filter: EventReviewFilter) =>
    ['reviews', eventId, filter] as const,
  myReview: (eventId: number) => ['reviews', eventId, 'my'] as const,
  reviewsStatistics: (eventId: number) =>
    ['reviews', eventId, 'statistics'] as const,
};
