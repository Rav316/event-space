import type { EventRequestData } from '@/api/events/model.ts';

export const EVENTS_KEYS = {
  all: ['events'] as const,
  actual: ['events', 'actual'] as const,
  filters: (eventRequestData: EventRequestData) =>
    [
      ...EVENTS_KEYS.all,
      eventRequestData.filter,
      eventRequestData.page,
    ] as const,
  tags: (prefix: string) => ['tags', prefix] as const
};
