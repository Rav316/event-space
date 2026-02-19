import { EventPreviewFilter } from '@/src/api/events/models';
import { EventReviewFilter } from '@/src/api/event-reviews/model';

export const EVENT_KEYS = {
  all: ['events'] as const,
  confirmAttendance: ['events', 'confirm-attendance'] as const,
  preview: (filter: EventPreviewFilter) => [...EVENT_KEYS.all, filter] as const,
  byId: (eventId: number) => [...EVENT_KEYS.all, eventId] as const,
  steps: (eventId: number) => [eventId, 'steps'] as const,
  reviews: (eventId: number, filter: EventReviewFilter) =>
    ['reviews', eventId, filter] as const,
  reviewsStatistics: (eventId: number) =>
    ['reviews', eventId, 'statistics'] as const
};