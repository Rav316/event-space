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
import { useEventFilterStore } from '@/src/store/use-event-filter-store';

export const CategoriesFilter = () => {
  const colorScheme = useColorScheme().colorScheme;

  const { data, isPending } = useEventCategoriesWithEventCount();

  const selectedCategories = useEventFilterStore((state) => state.categories);
  const addCategory = useEventFilterStore((state) => state.addCategory);
  const removeCategory = useEventFilterStore((state) => state.removeCategory);

  const handleCategoryToggle = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      removeCategory(categoryId);
    } else {
      addCategory(categoryId);
    }
  };

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
                      onCheckedChange={() => handleCategoryToggle(item.id)}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => <View className={'h-6'} />}
                />
              </PopoverContent>
            </StyledButton>
          </PopoverTrigger>
        </Popover>
      )}
    </>
  );
};
