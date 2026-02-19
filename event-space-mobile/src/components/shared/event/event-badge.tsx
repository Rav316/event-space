import { View } from 'react-native';
import React from 'react';
import { LucideProps } from 'lucide-react-native';
import { StyledText } from '@/src/components/ui';
import { useColorScheme } from 'nativewind';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  caption: string;
  iconColor?: string;
}

export const EventBadge: React.FC<Props> = ({Icon, text, caption, iconColor}) => {
  const colorScheme = useColorScheme().colorScheme;
  const resolvedIconColor = iconColor ?? (colorScheme === 'dark' ? '#ffffff' : '#000000');

  return (
    <View
      className={
        'flex-row border border-black/20 dark:border-white/20 rounded-xl items-center p-3 gap-3'
      }
    >
      <View className={'items-center justify-center rounded-lg'}>
        <Icon color={resolvedIconColor} />
      </View>
      <View>
        <StyledText className={'font-medium text-base'}>{text}</StyledText>
        <StyledText className={'text-xs text-muted-foreground'}>{caption}</StyledText>
      </View>
    </View>
  );
}