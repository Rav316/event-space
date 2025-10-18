import { MessageSquare, Star } from 'lucide-react';
import { StarRating } from '@/components/shared/star-rating.tsx';
import { ReviewProgressBar } from '@/components/shared/review-progress-bar.tsx';
import { Button, Skeleton } from '@/components/ui';
import { ReviewFilters } from '@/components/shared/review-filters.tsx';
import { EventReview } from '@/components/shared/event-review.tsx';
import React from 'react';
import { useEventReviews } from '@/api/events/hooks.ts';

interface Props {
  eventId: number;
}

export const EventReviews: React.FC<Props> = ({ eventId }) => {
  const { data: reviews, isPending: isReviewsPending } =
    useEventReviews(eventId);

  return (
    <div
      className={'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5'}
    >
      <div className={'flex gap-4 items-center'}>
        <MessageSquare />
        <span>Отзывы участников</span>
      </div>
      <div className={'flex items-center gap-4'}>
        <div className={'flex flex-col gap-1'}>
          <span className={'font-bold text-3xl text-center'}>3.5</span>
          <StarRating rating={3.5} />
          <span className={'text-muted-foreground text-center'}>
            14 отзывов
          </span>
        </div>
        <div className={'flex flex-col gap-1 w-full'}>
          <ReviewProgressBar rating={5} count={8} total={14} />
          <ReviewProgressBar rating={4} count={4} total={14} />
          <ReviewProgressBar rating={3} count={2} total={14} />
          <ReviewProgressBar rating={2} count={0} total={14} />
          <ReviewProgressBar rating={1} count={0} total={14} />
        </div>
      </div>
      <Button>
        <Star />
        <span>Оставить отзыв</span>
      </Button>
      <ReviewFilters />
      <div className={'flex flex-col gap-4'}>
        {isReviewsPending || !reviews ? (
          <div className={'flex flex-col gap-4'}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className={'w-full h-[200px]'} />
            ))}
          </div>
        ) : (
          reviews.content.map((review) => (
            <EventReview key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
};
