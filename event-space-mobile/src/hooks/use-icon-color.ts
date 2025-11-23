import { useColorScheme } from 'nativewind';

export const useIconColor = () => {
  const colorScheme = useColorScheme().colorScheme;
  return colorScheme === 'dark' ? '#FFF' : '#000'
}