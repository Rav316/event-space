import { View } from 'react-native';
import React from 'react';
import { StyledText } from '@/src/components/ui';

interface Props {
  description: string;
}

export const EventDescriptionBlock: React.FC<Props> = ({ description }) => {
  return (
    <View
      className={'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-2'}
    >
      <StyledText className={'font-medium text-xl'}>
        Описание мероприятия
      </StyledText>
      <StyledText className={'text-muted-foreground text-sm'}>
        {description}
      </StyledText>
    </View>
  );
};
