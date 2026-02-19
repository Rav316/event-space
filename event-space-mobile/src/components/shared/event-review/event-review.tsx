import { View } from 'react-native';
import { UserAvatar } from '@/src/components/shared/profile';
import { Separator, StyledButton, StyledText } from '@/src/components/ui';
import { StarRating } from '@/src/components/shared/event-review/star-rating';
import { ThumbsUp } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export const EventReview = () => {
  const colorScheme = useColorScheme().colorScheme;
  const resolvedIconColor = colorScheme === 'dark' ? '#ffffff' : '#000000';

  return (
    <View
      className={
        'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-3'
      }
    >
      <View className={'flex-row items-center gap-2'}>
        <UserAvatar firstName={'Alex'} lastName={'test'} />
        <View className={'gap-0.5'}>
          <StyledText className={'font-medium text-base'}>
            Пользователь 50
          </StyledText>
          <View className={'flex-row gap-2'}>
            <StarRating rating={3} starSize={13} />
            <StyledText className={'text-muted-foreground text-xs'}>
              19.10.2025 12:35
            </StyledText>
          </View>
        </View>
      </View>

      <StyledText className={'font-medium text-base'}>
        Lorem ipsum dolor sit amet, consectetur adipisicing edit.
      </StyledText>

      <StyledText className={'text-sm leading-5'}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus
        aliquid assumenda, et exercitationem facere facilis harum ipsa nemo
        nesciunt nisi odio quasi, quisquam rem repellat saepe suscipit
        temporibus, voluptate!
      </StyledText>
      <Separator />
      <StyledButton variant={'ghost'} className={'self-start'}>
        <ThumbsUp color={resolvedIconColor}/>
        <StyledText>Полезно (123)</StyledText>
      </StyledButton>
    </View>
  );
};
