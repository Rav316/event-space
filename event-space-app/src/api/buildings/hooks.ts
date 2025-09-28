import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { BUILDINGS_KEYS } from '@/api/buildings/keys.ts';

export const useBuildings = () => {
  return useQuery({
    queryFn: Api.buildings.findAll,
    queryKey: BUILDINGS_KEYS.all,
    staleTime: Infinity
  })
}