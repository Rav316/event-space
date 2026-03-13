export const BUILDINGS_KEYS = {
  all: ['buildings'] as const,
  nameExists: (name: string) => ['buildings', 'nameExists', name] as const,
  deleteImpact: (id: number) => ['buildings', 'deleteImpact', id] as const,
};
