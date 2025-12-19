import { useQuery } from '@tanstack/react-query';
import { Api } from '@/src/api/api-client';
import { FACULTIES_KEYS } from '@/src/api/faculties/keys';

export const useFaculties = () => {
  return useQuery({
    queryFn: Api.faculties.findAll,
    queryKey: FACULTIES_KEYS.all
  })
}