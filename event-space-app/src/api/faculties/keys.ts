export const FACULTIES_KEYS = {
  all: ['faculties'] as const,
  deleteImpact: (id: number) => ['faculties', 'delete-impact', id] as const,
};
