import { EventPreviewFilter } from '@/src/api/events/models';

export const EVENT_KEYS = {
  confirmAttendance: ['events', 'confirm-attendance'] as const,
  all: (filter: EventPreviewFilter) => ['events', filter] as const
};