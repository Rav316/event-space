import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/src/components/ui/select';
import { View } from 'react-native';
import { SortAsc } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { eventSortCategories } from '@/src/constants/event-sort-categories';
import { useEventFilterStore } from '@/src/store/use-event-filter-store';

export const EventSortSelect = () => {
  const colorScheme = useColorScheme().colorScheme;
  const selectedSort = useEventFilterStore((state) => state.sort);
  const setSelectedSort = useEventFilterStore((state) => state.setSort);

  const currentLabel =
    eventSortCategories.find((item) => item.value === selectedSort)?.label ??
    '';

  return (
    <Select
      className={'w-[53%]'}
      value={{ value: selectedSort, label: currentLabel }}
      onValueChange={(val) => setSelectedSort(val!.value)}
    >
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
  );
};
