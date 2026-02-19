import { View } from 'react-native';
import { MessageSquare } from 'lucide-react-native';
import { StyledText } from '@/src/components/ui';
import { useColorScheme } from 'nativewind';
import { StarRating } from '@/src/components/shared/event-review/star-rating';
import { ReviewProgressBar } from '@/src/components/shared/event-review/review-progress-bar';

export const EventReviewsBlock = () => {
  const colorScheme = useColorScheme().colorScheme;
  const resolvedIconColor = colorScheme === 'dark' ? '#ffffff' : '#000000';

  return (
    <View className={'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-3'}>
      <View className={'flex-row gap-2 items-center'}>
        <MessageSquare color={resolvedIconColor} />
        <StyledText className={'font-medium text-xl'}>
          Отзывы участников
        </StyledText>
      </View>
      <View className={'flex-row items-center'}>
        <View className={'items-center gap-2'}>
          <StyledText className={'font-medium text-4xl'}>0.00</StyledText>
          <StarRating rating={3.5}/>
          <StyledText className={'text-muted-foreground text-xs'}>0 отзывов</StyledText>
        </View>
        <View className={'flex-1'}>
          <ReviewProgressBar rating={5} count={10} total={50}/>
          <ReviewProgressBar rating={4} count={10} total={50}/>
          <ReviewProgressBar rating={3} count={10} total={50}/>
          <ReviewProgressBar rating={2} count={10} total={50}/>
          <ReviewProgressBar rating={1} count={10} total={50}/>
        </View>
      </View>
    </View>
  );
}