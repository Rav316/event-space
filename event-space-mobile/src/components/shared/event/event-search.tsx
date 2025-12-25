import { StyleSheet, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { StyledInput } from '@/src/components/ui';
import { useColorScheme } from 'nativewind';
import { useEventFilterStore } from '@/src/store/use-event-filter-store';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';

export const EventSearch = () => {
  const colorScheme = useColorScheme().colorScheme;

  const eventName = useEventFilterStore((state) => state.name);
  const setEventName = useEventFilterStore((state) => state.setName);

  const [inputValue, setInputValue] = useState(eventName);
  const [debouncedValue] = useDebounce(inputValue, 200);

  useEffect(() => {
    if(debouncedValue !== undefined) {
      setEventName(debouncedValue);
    }
  }, [debouncedValue, setEventName]);

  useEffect(() => {
    setInputValue(eventName);
  }, [eventName]);

  return (
    <View className="relative flex-row items-center">
      <StyledInput
        className="pl-10 w-full"
        placeholder={'Введите название мероприятия...'}
        value={inputValue}
        onChangeText={setInputValue}
      />

      <Search
        style={styles.icon}
        width={16}
        height={16}
        stroke={colorScheme === 'dark' ? '#fff' : '#000'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    left: 12,
    zIndex: 10,
    top: '50%',
    marginTop: -8
  }
});
