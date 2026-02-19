import { View } from 'react-native';
import { MessageSquare } from 'lucide-react-native';
import { StyledText } from '@/src/components/ui';
import { useColorScheme } from 'nativewind';
import { StarRating } from '@/src/components/shared/event-review/star-rating';
import { ReviewProgressBar } from '@/src/components/shared/event-review/review-progress-bar';
import React from 'react';
import { EventReadDto } from '@/src/api/events/models';
import { useReviewsStatisticsByEvent } from '@/src/api/events/hooks';

interface Props {
  event: EventReadDto;
}

export const EventReviewsBlock: React.FC<Props> = ({ event }) => {
  const colorScheme = useColorScheme().colorScheme;
  const resolvedIconColor = colorScheme === 'dark' ? '#ffffff' : '#000000';

  const { data: statistics, isPending: isStatisticsPending } =
    useReviewsStatisticsByEvent(event.id);

  if (isStatisticsPending || !statistics) {
    // TODO 19.02.2026 13:57:18 поменять на нормальный скелетон
    return (
      <View>
        <StyledText>Loading...</StyledText>
      </View>
    );
  }

  return (
    <View
      className={
        'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-3'
      }
    >
      <View className={'flex-row gap-2 items-center'}>
        <MessageSquare color={resolvedIconColor} />
        <StyledText className={'font-medium text-xl'}>
          Отзывы участников
        </StyledText>
      </View>
      <View className={'flex-row items-center'}>
        <View className={'items-center gap-2'}>
          <StyledText className={'font-medium text-4xl'}>{statistics.avgRating ? statistics.avgRating.toFixed(2) : '--'}</StyledText>
          <StarRating rating={statistics.avgRating} />
          <StyledText className={'text-muted-foreground text-xs'}>
            {statistics.total} отзывов
          </StyledText>
        </View>
        <View className={'flex-1'}>
          <ReviewProgressBar rating={5} count={statistics.fiveStars} total={statistics.total} />
          <ReviewProgressBar rating={4} count={statistics.fourStars} total={statistics.total} />
          <ReviewProgressBar rating={3} count={statistics.threeStars} total={statistics.total} />
          <ReviewProgressBar rating={2} count={statistics.twoStars} total={statistics.total} />
          <ReviewProgressBar rating={1} count={statistics.oneStar} total={statistics.total} />
        </View>
      </View>
    </View>
  );
};
