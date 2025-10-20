import { Ban, Lock, MessageSquare, Star } from 'lucide-react';
import { Button } from '@/components/ui';
import React, { useState } from 'react';
import {
  useAddReview,
  useEventReviewsStatistics,
  useMyReviewByEvent,
} from '@/api/events/hooks.ts';
import {
  EventReviewsList,
  EventReviewsSkeleton,
  MyReview,
  ReviewAddForm,
  ReviewFilters,
  ReviewProgressBar,
} from '@/components/shared/event-review';
import { StarRating } from '@/components/shared';
import type { EventReviewCreateDto } from '@/api/event-reviews/model.ts';
import { useMe } from '@/api/auth/hooks.ts';
import { useAuthModalStore } from '@/store/use-auth-modal-store.ts';
import type { EventReadDto } from '@/api/events/model.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewAddSchema } from '@/schemas/review-add-schema.ts';

interface Props {
  event: EventReadDto;
}

export const EventReviews: React.FC<Props> = ({ event }) => {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const setAuthModalOpen = useAuthModalStore((state) => state.setIsOpen);
  const { data: me } = useMe();
  const { data: myReview } = useMyReviewByEvent(event.id, { enabled: !!me });
  const reviewAddMutation = useAddReview();

  const { data: statistics, isPending: isStatisticsPending } =
    useEventReviewsStatistics(event.id);

  const reviewAddForm = useForm<EventReviewCreateDto>({
    resolver: zodResolver(reviewAddSchema),
    defaultValues: {
      rating: 0,
      title: '',
      content: '',
    },
  });

  const onAddReview = (data: EventReviewCreateDto) => {
    reviewAddMutation.mutate(
      { eventId: event.id, review: data },
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

      {!myReview && (
        <Button
          onClick={() => {
            if (!me) {
              setAuthModalOpen(true);
              return;
            }
            if (me && event?.isAttended) {
              setIsReviewFormOpen(true);
            }
          }}
          disabled={me && !event?.isAttended}
        >
          {!me ? (
            <>
              <Lock />
              <span>Войти, чтобы оставить отзыв</span>
            </>
          ) : !event?.isAttended ? (
            <>
              <Ban />
              <span>Отзывы доступны только посетителям</span>
            </>
          ) : (
            <>
              <Star />
              <span>Оставить отзыв</span>
            </>
          )}
        </Button>
      )}


      {isReviewFormOpen && (
        <ReviewAddForm
          onCancel={() => setIsReviewFormOpen(false)}
          onSubmit={onAddReview}
          isPending={reviewAddMutation.isPending}
          form={reviewAddForm}
        />
      )}

      {myReview && <MyReview review={myReview}/>}

      <ReviewFilters />
      <EventReviewsList eventId={event.id} />
    </div>
  );
};
