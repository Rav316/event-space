import { FlatList, View } from 'react-native';
import { Funnel } from 'lucide-react-native';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/src/components/ui/popover';
import { Skeleton, StyledButton, StyledText } from '@/src/components/ui';
import { useColorScheme } from 'nativewind';
import { CategoryCheckbox } from '@/src/components/shared/event/category-checkbox';
import { useEventCategoriesWithEventCount } from '@/src/api/event-categories/hooks';
import React from 'react';

interface Props {
  selectedCategories: number[];
  onCategorySelect: (categoryId: number) => void;
}

export const CategoriesFilter: React.FC<Props> = ({
  selectedCategories,
  onCategorySelect
}) => {
  const colorScheme = useColorScheme().colorScheme;

  const { data, isPending } = useEventCategoriesWithEventCount();

  return (
    <>
      {isPending ? (
        <Skeleton className={'w-full h-10'} />
      ) : (
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
                  data={data}
                  renderItem={({ item }) => (
                    <CategoryCheckbox
                      id={item.id}
                      name={item.name}
                      count={item.eventCount}
                      checked={selectedCategories.includes(item.id)}
                      onCheckedChange={() => {}}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => <View className={'h-2'} />}
                />
              </PopoverContent>
            </StyledButton>
          </PopoverTrigger>
        </Popover>
      )}
    </>
  );
};
