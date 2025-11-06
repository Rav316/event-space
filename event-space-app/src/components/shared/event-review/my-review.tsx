import { Button, Separator } from '@/components/ui';
import { Pencil } from 'lucide-react';
import { StarRating } from '@/components/shared';
import { useForm } from 'react-hook-form';
import type {
  EventReviewCreateEditDto,
  EventReviewMyDto,
} from '@/api/event-reviews/model.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewAddSchema } from '@/schemas/review-add-schema.ts';
import React, { useState } from 'react';
import { ReviewAddEditForm } from '@/components/shared/event-review/review-add-edit-form.tsx';
import { useUpdateReview } from '@/api/events/hooks.ts';
import { ConfirmReviewDeletionDialog } from '@/components/modal';
import {
  useMarkMyReviewAsHelpful,
  useUnmarkMyReviewAsHelpful,
} from '@/api/event-reviews/hooks.ts';
import { HelpfulButton } from '@/components/shared/event-review/helpful-button.tsx';

interface Props {
  review: EventReviewMyDto;
}

export const MyReview: React.FC<Props> = ({ review }) => {
  const [editMode, setEditMode] = useState(false);

  const myReviewForm = useForm<EventReviewCreateEditDto>({
    resolver: zodResolver(reviewAddSchema),
    defaultValues: {
      rating: review.rating,
      title: review.title,
      content: review.content,
    },
  });

  const updateReviewMutation = useUpdateReview();

  const onSubmit = (data: EventReviewCreateEditDto) => {
    updateReviewMutation.mutate(
      { eventId: review.event, review: { ...data } },
      {
        onSuccess: () => {
          setEditMode(false);
        },
      },
    );
  };

  const markMyReviewAsHelpfulMutation = useMarkMyReviewAsHelpful(review.event);
  const unmarkMyReviewAsHelpfulMutation = useUnmarkMyReviewAsHelpful(
    review.event,
  );
  //
  // const handleHelpfulClick = () => {
  //   if (clickLocked) return;
  //   setClickLocked(true);
  //   setTimeout(() => setClickLocked(false), 300);
  //   if (review.userMarkedHelpful) {
  //     unmarkMyReviewAsHelpfulMutation.mutate(review.id);
  //   } else {
  //     markMyReviewAsHelpfulMutation.mutate(review.id);
  //   }
  // };
  //
  // const helpfulButtonDisabled =
  //   updateReviewMutation.isPending ||
  //   unmarkMyReviewAsHelpfulMutation.isPending ||
  //   clickLocked;

  return (
    <>
      {editMode ? (
        <ReviewAddEditForm
          onSubmit={onSubmit}
          onCancel={() => {
            setEditMode(false);
          }}
          form={myReviewForm}
          isEdit={true}
          isPending={updateReviewMutation.isPending}
        />
      ) : (
        <div
          className={
            'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5 max-[410px]:p-3'
          }
        >
          <div
            className={
              'flex gap-4 justify-between items-center max-[550px]:flex-col max-[550px]:items-start max-[400px]:items-center'
            }
          >
            <span className={'font-medium text-xl'}>
              Ваш отзыв о мероприятии
            </span>
            <div
              className={
                'flex gap-4 items-center max-[400px]:flex-col max-[400px]:w-full'
              }
            >
              <Button
                variant={'outline'}
                className={'max-[400px]:w-full'}
                onClick={() => setEditMode(true)}
              >
                <Pencil />
                <span>Редактировать</span>
              </Button>
              <ConfirmReviewDeletionDialog eventId={review.event} />
            </div>
          </div>
          <div className={'flex flex-col gap-0.5'}>
            <StarRating rating={review.rating} />
            <span className={'text-muted-foreground'}>20.01.2024</span>
          </div>
          <h3 className={'font-medium text-xl'}>{review.title}</h3>
          <p>{review.content}</p>
          <Separator />
          <div>
            <HelpfulButton
              reviewId={review.id}
              userMarkedHelpful={review.userMarkedHelpful}
              helpfulMarks={review.helpfulMarks}
              markAsHelpfulMutation={markMyReviewAsHelpfulMutation}
              unmarkAsHelpfulMutation={unmarkMyReviewAsHelpfulMutation}
            />
          </div>
        </div>
      )}
    </>
  );
};
