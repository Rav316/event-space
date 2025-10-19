import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { FACULTIES_KEYS } from '@/api/faculties/keys.ts';

export const useFaculties = () => {
  return useQuery({
    queryFn: Api.faculties.findAll,
    queryKey: FACULTIES_KEYS.all,
  });
};
