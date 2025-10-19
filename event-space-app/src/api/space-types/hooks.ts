import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { SPACE_TYPES_KEYS } from '@/api/space-types/keys.ts';

export const useSpaceTypes = () => {
  return useQuery({
    queryFn: Api.spaceTypes.findAll,
    queryKey: SPACE_TYPES_KEYS.all,
    staleTime: Infinity,
  });
};
