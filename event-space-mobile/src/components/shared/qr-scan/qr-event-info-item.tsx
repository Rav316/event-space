import { StyledText } from '@/src/components/ui';
import React from 'react';
import { View } from 'react-native';

interface Props {
  title: string;
  value: string;
}

export const QrEventInfoItem: React.FC<Props> = ({ title, value }) => {
  return (
    <View className={'flex-row items-start justify-between gap-4 w-full'}>
      <StyledText className={'flex-shrink text-muted-foreground text-sm'}>
        {title}
      </StyledText>
      <StyledText
        className={'flex-1 text-right text-sm leading-tight'}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {value}
      </StyledText>
    </View>
  );
};
