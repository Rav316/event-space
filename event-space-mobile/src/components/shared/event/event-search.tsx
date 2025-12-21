import { StyleSheet, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { StyledInput } from '@/src/components/ui';
import { useColorScheme } from 'nativewind';

export const EventSearch = () => {
  const colorScheme = useColorScheme().colorScheme;

  return (
    <View className="relative flex-row items-center">
      <StyledInput
        className="pl-10 w-full"
        placeholder={'Введите название мероприятия...'}
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
