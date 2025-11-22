import { ActivityIndicator } from 'react-native';
import { useColorScheme } from 'nativewind';

export const Spinner = () => {
  const colorScheme = useColorScheme().colorScheme;

  return (
    <ActivityIndicator
      size="small"
      color={colorScheme === 'dark' ? '#000' : '#fff'}
    />
  );
};
