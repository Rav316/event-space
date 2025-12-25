import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/src/components/ui/select';
import { View } from 'react-native';
import { ClockArrowUp } from 'lucide-react-native';
import { eventPeriods } from '@/src/constants/event-periods';
import { useColorScheme } from 'nativewind';
import { useEventFilterStore } from '@/src/store/use-event-filter-store';

export const EventPeriodSelect = () => {
  const colorScheme = useColorScheme().colorScheme;
  const selectedPeriod = useEventFilterStore((state) => state.period);
  const setSelectedPeriod = useEventFilterStore((state) => state.setPeriod);

  const currentLabel =
    eventPeriods.find((item) => item.value === selectedPeriod)?.label ?? '';

  return (
    <Select
      className={'flex-1'}
      value={{ value: selectedPeriod, label: currentLabel }}
      onValueChange={(val) => setSelectedPeriod(val!.value)}
    >
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
  );
};
