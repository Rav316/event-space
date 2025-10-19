import { MessageSquare, Star } from 'lucide-react';
import { Button } from '@/components/ui';
import React, { useState } from 'react';
import { useAddReview, useEventReviewsStatistics } from '@/api/events/hooks.ts';
import {
  EventReviewsList,
  EventReviewsSkeleton,
  ReviewAddForm,
  ReviewFilters,
  ReviewProgressBar,
} from '@/components/shared/event-review';
import { StarRating } from '@/components/shared';
import type { EventReviewCreateDto } from '@/api/event-reviews/model.ts';

interface Props {
  eventId: number;
}

export const EventReviews: React.FC<Props> = ({ eventId }) => {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const reviewAddMutation = useAddReview();

  const { data: statistics, isPending: isStatisticsPending } =
    useEventReviewsStatistics(eventId);

  const onAddReview = (data: EventReviewCreateDto) => {
    reviewAddMutation.mutate(
      { eventId, review: data },
      {
        onSuccess: () => {
          setIsReviewFormOpen(false);
        },
      },
    );
  };

  if (isStatisticsPending || !statistics) {
    return <EventReviewsSkeleton />;
  }
  return (
    <div className="flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5">
      <div className="flex gap-4 items-center">
        <MessageSquare />
        <span>Отзывы участников</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-3xl text-center">
            {statistics.avgRating.toFixed(2)}
          </span>
          <StarRating rating={statistics.avgRating} />
          <span className="text-muted-foreground text-center">
            {statistics.total} отзывов
          </span>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <ReviewProgressBar
            rating={5}
            count={statistics.fiveStars}
            total={statistics.total}
          />
          <ReviewProgressBar
            rating={4}
            count={statistics.fourStars}
            total={statistics.total}
          />
          <ReviewProgressBar
            rating={3}
            count={statistics.threeStars}
            total={statistics.total}
          />
          <ReviewProgressBar
            rating={2}
            count={statistics.twoStars}
            total={statistics.total}
          />
          <ReviewProgressBar
            rating={1}
            count={statistics.oneStar}
            total={statistics.total}
          />
        </div>
      </div>

      <Button onClick={() => setIsReviewFormOpen(true)}>
        <Star />
        <span>Оставить отзыв</span>
      </Button>
      {isReviewFormOpen && (
        <ReviewAddForm
          onCancel={() => setIsReviewFormOpen(false)}
          onSubmit={onAddReview}
          isPending={reviewAddMutation.isPending}
        />
      )}

      <ReviewFilters />
      <EventReviewsList eventId={eventId} />
    </div>
  );
};
