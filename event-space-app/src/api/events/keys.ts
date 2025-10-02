import type { EventFilter } from '@/api/events/model.ts';

export const EVENTS_KEYS = {
  all: ['events'] as const,
  actual: ['actual-events'] as const,
  filters: (filter: EventFilter) => [...EVENTS_KEYS.all, filter] as const
}