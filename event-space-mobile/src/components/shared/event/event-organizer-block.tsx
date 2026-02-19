import { View } from 'react-native';
import { StyledText } from '@/src/components/ui';
import { UserAvatar } from '@/src/components/shared/profile';

export const EventOrganizerBlock = () => {
  return (
    <View
      className={'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-2'}
    >
      <StyledText className={'font-medium text-xl'}>Организатор</StyledText>
      <View className={'flex-row items-center gap-2'}>
        <UserAvatar
          avatarUrl={'/Users/alex/Desktop/118563959.jpeg'}
          className={'w-12 h-12'}
        />
        <View>
          <StyledText className={'font-medium text-base'}>Alex test</StyledText>
          <StyledText className={'text-muted-foreground text-xs'}>Социология и политология</StyledText>
        </View>
      </View>
    </View>
  );
}