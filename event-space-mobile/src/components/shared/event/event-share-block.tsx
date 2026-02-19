import { View } from 'react-native';
import { StyledButton, StyledText } from '@/src/components/ui';
import { Download, Link2 } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export const EventShareBlock = () => {
  const colorScheme = useColorScheme().colorScheme;
  const resolvedIconColor = colorScheme === 'dark' ? '#ffffff' : '#000000';

  return (
    <View
      className={'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-2'}
    >
      <StyledText className={'font-medium text-xl'}>Поделиться</StyledText>
      <View className={'gap-2'}>
        <StyledButton variant={'outline'}>
          <Link2 color={resolvedIconColor} />
          <StyledText>Скопировать ссылку</StyledText>
        </StyledButton>
        <StyledButton variant={'outline'}>
          <Download color={resolvedIconColor}/>
          <StyledText>Добавить в календарь</StyledText>
        </StyledButton>
      </View>
    </View>
  );
}