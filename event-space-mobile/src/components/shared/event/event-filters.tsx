import { FlatList, View } from 'react-native';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/src/components/ui/select';
import { useColorScheme } from 'nativewind';
import { ClockArrowUp, Funnel, SortAsc } from 'lucide-react-native';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/src/components/ui/popover';
import { StyledButton, StyledText } from '@/src/components/ui';
import { CategoryCheckbox } from '@/src/components/shared/event/category-checkbox';
import { eventSortCategories } from '@/src/constants/event-sort-categories';
import { eventPeriods } from '@/src/constants/event-periods';

const eventCategoriesWithEventCount = [
  {
    id: 1,
    name: 'IT-секции',
    eventCount: 1
  },
  {
    id: 2,
    name: 'Культурные',
    eventCount: 7
  },
  {
    id: 3,
    name: 'Социальные',
    eventCount: 12
  },
  {
    id: 4,
    name: 'Спортивные',
    eventCount: 2
  },
  {
    id: 5,
    name: 'Учебные',
    eventCount: 10
  }
];

export const EventFilters = () => {
  const colorScheme = useColorScheme().colorScheme;

  return (
    <View className={'gap-2'}>
      <Popover>
        <PopoverTrigger asChild>
          <StyledButton variant={'outline'}>
            <Funnel
              stroke={colorScheme === 'dark' ? '#fff' : '#000'}
              width={16}
              height={16}
            />
            <StyledText>Выберите категории</StyledText>
            <PopoverContent>
              <FlatList
                data={eventCategoriesWithEventCount}
                renderItem={({ item }) => (
                  <CategoryCheckbox
                    id={item.id}
                    name={item.name}
                    count={item.eventCount}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className={'h-2'} />}
              />
            </PopoverContent>
          </StyledButton>
        </PopoverTrigger>
      </Popover>
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
            {eventSortCategories.map(({label, value}) => (
              <SelectItem key={value} value={value} label={label}/>
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
            {eventPeriods.map(({label, value}) => (
              <SelectItem key={value} value={value} label={label}/>
            ))}
          </SelectContent>
        </Select>
      </View>
    </View>
  );
};
