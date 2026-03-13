export const EVENT_CATEGORIES_KEYS = {
  all: ['event-categories'] as const,
  withEventCount: ['event-categories-with-event-count'] as const,
  nameExists: (name: string) =>
    ['event-categories', 'nameExists', name] as const,
  deleteImpact: (id: number) =>
    ['event-categories', 'deleteImpact', id] as const,
};
