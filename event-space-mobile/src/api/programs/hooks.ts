import { useQuery } from '@tanstack/react-query';
import { Api } from '@/src/api/api-client';
import { PROGRAMS_KEYS } from '@/src/api/programs/keys';

export const usePrograms = () => {
  return useQuery({
    queryFn: Api.programs.findAll,
    queryKey: PROGRAMS_KEYS.all
  })
}