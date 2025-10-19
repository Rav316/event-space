import type { SpaceFilter } from '@/api/spaces/model.ts';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { SPACES_KEYS } from '@/api/spaces/keys.ts';

export const useSpaces = (filter: SpaceFilter) => {
  return useQuery({
    queryFn: () => Api.spaces.findAllByFilter(filter),
    queryKey: [SPACES_KEYS.filters(filter)],
    enabled: filter.building !== 0,
    staleTime: Infinity,
  });
};
