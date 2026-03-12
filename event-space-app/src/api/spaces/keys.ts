import type { SpaceFilter } from '@/api/spaces/model.ts';

export const SPACES_KEYS = {
  all: ['spaces'] as const,
  filters: (filter: SpaceFilter) => [...SPACES_KEYS.all, filter] as const,
  spaceTypes: ['space-types'] as const,
};
