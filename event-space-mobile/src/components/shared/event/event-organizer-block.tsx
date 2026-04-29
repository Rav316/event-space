import { View } from 'react-native';
import { StyledText } from '@/src/components/ui';
import { UserAvatar } from '@/src/components/shared/profile';
import React from 'react';
import { cn } from '@/src/lib/utils';

interface Props {
  className?: string;
  firstName: string;
  lastName: string;
  program: string;
  avatarUrl?: string | false;
}

export const EventOrganizerBlock: React.FC<Props> = ({
  className,
  firstName,
  lastName,
  program,
  avatarUrl
}) => {
  const staticContentUrl = process.env.EXPO_PUBLIC_STATIC_URL;

  const avatarUrlFinal = avatarUrl ? `${staticContentUrl}${avatarUrl}` : false;

  return (
    <View
      className={cn(
        'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-2',
        className
      )}
    >
      <StyledText className={'font-medium text-xl'}>Организатор</StyledText>
      <View className={'flex-row items-center gap-2'}>
        <UserAvatar
          avatarUrl={avatarUrlFinal}
          firstName={firstName}
          lastName={lastName}
          className={'w-12 h-12'}
        />
        <View>
          <StyledText className={'font-medium text-base'}>Alex test</StyledText>
          <StyledText className={'text-muted-foreground text-xs'}>
            {program}
          </StyledText>
        </View>
      </View>
    </View>
  );
};
