import { ActivityIndicator, View } from 'react-native';
import { EventReview } from '@/src/components/shared/event-review/event-review';
import { Skeleton } from '@/src/components/ui/skeleton';
import { StyledText } from '@/src/components/ui';
import React from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { SliceResponse } from '@/src/api/model';
import { EventReviewReadDto } from '@/src/api/event-reviews/model';

interface Props {
  reviews: InfiniteData<SliceResponse<EventReviewReadDto>> | undefined;
  isPending: boolean;
  isFetchingNextPage: boolean;
  onHelpfulPress?: (reviewId: number) => void;
}

export const EventReviewsList: React.FC<Props> = ({
  reviews,
  isPending,
  isFetchingNextPage,
  onHelpfulPress
}) => {
  if (isPending || !reviews) {
    return (
      <View className={'gap-2'}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className={'h-[200px] rounded-xl'} />
        ))}
      </View>
    );
  }

  const allReviews = reviews.pages.flatMap((page) => page.content);

  if (allReviews.length === 0) {
    return (
      <StyledText className={'text-center text-muted-foreground'}>
        Отзывов пока нет
      </StyledText>
    );
  }

  return (
    <View className={'gap-2'}>
      {allReviews.map((review) => (
        <EventReview key={review.id} review={review} onHelpfulPress={onHelpfulPress} />
      ))}

      {isFetchingNextPage && <ActivityIndicator className={'py-2'} />}
    </View>
  );
};
