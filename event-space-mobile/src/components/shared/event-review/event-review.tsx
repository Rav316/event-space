import { useRef, useState } from 'react';
import { View } from 'react-native';
import { UserAvatar } from '@/src/components/shared/profile';
import { Separator, StyledButton, StyledText } from '@/src/components/ui';
import { StarRating } from '@/src/components/shared/event-review/star-rating';
import { ThumbsUp } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { EventReviewReadDto } from '@/src/api/event-reviews/model';
import { formatDateToRuFormat } from '@/src/utils/format-date-to-ru-format';

interface Props {
  review: EventReviewReadDto;
  onHelpfulPress?: (reviewId: number) => void;
}

export const EventReview: React.FC<Props> = ({ review, onHelpfulPress }) => {
  const colorScheme = useColorScheme().colorScheme;
  const [isLocked, setIsLocked] = useState(false);

  const mutedColor = colorScheme === 'dark' ? '#a1a1aa' : '#71717a';
  const foregroundColor = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const resolvedIconColor = review.userMarkedHelpful ? foregroundColor : mutedColor;

  const countText = review.helpfulMarks > 0 ? ` (${review.helpfulMarks})` : '';

  return (
    <View
      className={
        'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-3'
      }
    >
      <View className={'flex-row items-center gap-2'}>
        <UserAvatar
          firstName={review.author.firstName}
          lastName={review.author.lastName}
          avatarUrl={review.author.avatarUrl}
        />
        <View className={'gap-0.5'}>
          <StyledText className={'font-medium text-base'}>
            {review.author.firstName} {review.author.lastName}
          </StyledText>
          <View className={'flex-row gap-2'}>
            <StarRating rating={review.rating} starSize={13} />
            <StyledText className={'text-muted-foreground text-xs'}>
              {formatDateToRuFormat(review.createdAt)}
            </StyledText>
          </View>
        </View>
      </View>

      <StyledText className={'font-medium text-base'}>
        {review.title}
      </StyledText>

      <StyledText className={'text-sm leading-5'}>
        {review.content}
      </StyledText>
      <Separator />
      <StyledButton
        variant={'ghost'}
        className={'self-start'}
        onPress={() => {
          if (isLocked || !onHelpfulPress) return;
          setIsLocked(true);
          onHelpfulPress(review.id);
          setTimeout(() => setIsLocked(false), 300);
        }}
      >
        <ThumbsUp
          color={resolvedIconColor}
          fill={review.userMarkedHelpful ? foregroundColor : 'transparent'}
          size={18}
        />
        <View className={'flex-row items-center'}>
          <StyledText style={{ color: resolvedIconColor }}>Полезно</StyledText>
          <StyledText style={{ color: resolvedIconColor }}>
            {countText}
          </StyledText>
        </View>
      </StyledButton>
    </View>
  );
};
