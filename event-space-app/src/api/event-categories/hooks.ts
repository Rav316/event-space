import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/api-client.ts';
import { EVENT_CATEGORIES_KEYS } from './keys';

export const useEventCategories = () => {
  return useQuery({
    queryFn: Api.eventCategories.findAll,
    queryKey: EVENT_CATEGORIES_KEYS.all
  })
}