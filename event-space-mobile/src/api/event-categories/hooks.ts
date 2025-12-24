import { useQuery } from '@tanstack/react-query';
import { Api } from '@/src/api/api-client';
import { EVENT_CATEGORIES_KEYS } from '@/src/api/event-categories/keys';

export const useEventCategoriesWithEventCount = () => {
  return useQuery({
    queryFn: Api.eventCategories.findAllWithEventCount,
    queryKey: EVENT_CATEGORIES_KEYS.withEventCount
  })
}