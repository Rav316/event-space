export const PROGRAMS_KEYS = {
  all: ['programs'] as const,
  deleteImpact: (id: number) => ['programs', 'delete-impact', id] as const,
};
