import { View } from 'react-native';
import { CategoriesFilter } from '@/src/components/shared/event/categories-filter';
import { EventSortSelect } from '@/src/components/shared/event/event-sort-select';
import { EventPeriodSelect } from '@/src/components/shared/event/event-period-select';

export const EventFilters = () => {
  return (
    <View className={'gap-2'}>
      <CategoriesFilter />
      <View className={'flex-row gap-2'}>
        <EventSortSelect/>
        <EventPeriodSelect/>
      </View>
    </View>
  );
};
