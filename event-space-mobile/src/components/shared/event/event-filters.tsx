import { View } from 'react-native';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/src/components/ui/select';
import { useColorScheme } from 'nativewind';
import { ClockArrowUp, SortAsc } from 'lucide-react-native';
import { eventSortCategories } from '@/src/constants/event-sort-categories';
import { eventPeriods } from '@/src/constants/event-periods';
import { CategoriesFilter } from '@/src/components/shared/event/categories-filter';

export const EventFilters = () => {
  const colorScheme = useColorScheme().colorScheme;

  return (
    <View className={'gap-2'}>
      <CategoriesFilter />
      <View className={'flex-row gap-2'}>
        <Select className={'w-[53%]'}>
          <SelectTrigger className={'w-full'}>
            <View className={'flex-row items-center gap-2'}>
              <SortAsc
                stroke={colorScheme === 'dark' ? '#fff' : '#000'}
                width={16}
                height={16}
              />
              <SelectValue
                className={'text-black dark:text-white'}
                placeholder={'По дате'}
              />
            </View>
          </SelectTrigger>
          <SelectContent>
            {eventSortCategories.map(({ label, value }) => (
              <SelectItem key={value} value={value} label={label} />
            ))}
          </SelectContent>
        </Select>

        <Select className={'flex-1'}>
          <SelectTrigger className={'w-full'}>
            <View className={'flex-row items-center gap-2'}>
              <ClockArrowUp
                stroke={colorScheme === 'dark' ? '#fff' : '#000'}
                width={16}
                height={16}
              />
              <SelectValue
                className={'text-black dark:text-white'}
                placeholder={'По дате'}
              />
            </View>
          </SelectTrigger>
          <SelectContent>
            {eventPeriods.map(({ label, value }) => (
              <SelectItem key={value} value={value} label={label} />
            ))}
          </SelectContent>
        </Select>
      </View>
    </View>
  );
};
