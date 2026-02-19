import { View } from 'react-native';
import React from 'react';
import { StyledText } from '@/src/components/ui';
import { EventStep } from '@/src/api/events/models';

interface Props {
  steps: EventStep[];
}

export const EventProgramBlock: React.FC<Props> = ({ steps }) => {
  return (
    <View
      className={'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-2'}
    >
      <StyledText className={'font-medium text-xl'}>
        Программа мероприятия
      </StyledText>
      <View className={'gap-4 mt-1'}>
        {steps.map((step, index) => (
          <View key={index} className={'flex-row gap-4'}>
            <StyledText className={'font-bold text-base w-14'}>
              {step.startTime.slice(0, 5)}
            </StyledText>
            <View className={'flex-1'}>
              <StyledText className={'font-medium text-base'}>
                {step.name}
              </StyledText>
              {step.description && (
                <StyledText className={'text-muted-foreground text-sm'}>
                  {step.description}
                </StyledText>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
