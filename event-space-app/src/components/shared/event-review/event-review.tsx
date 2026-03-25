import { Button } from '@/components/ui';
import { Flag } from 'lucide-react';
import React, { useState } from 'react';
import type { EventReviewReadDto } from '@/api/event-reviews/model.ts';
import { UserAvatar, StarRating } from '@/components/shared';
import {
  useMarkReviewAsHelpful,
  useUnmarkReviewAsHelpful,
} from '@/api/event-reviews/hooks.ts';
import { useEventReviewFilterStore } from '@/store/use-event-review-filter-store.ts';
import { HelpfulButton } from '@/components/shared/event-review/helpful-button.tsx';
import { ComplaintDialog } from '@/components/shared/event-review/complaint-dialog.tsx';
import { getAvatarUrl } from '@/utils/get-avatar-url.ts';

interface Props {
  review: EventReviewReadDto;
}

export const EventReview: React.FC<Props> = ({ review }) => {
  const [complaintOpen, setComplaintOpen] = useState(false);
  const date = new Date(review.createdAt);
  const formattedDate = date
    .toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(',', '');
  const eventReviewFilter = useEventReviewFilterStore((state) => state.filter);

  const markAsHelpfulMutation = useMarkReviewAsHelpful(
    review.event,
    eventReviewFilter,
  );
  const unmarkAsHelpfulMutation = useUnmarkReviewAsHelpful(
    review.event,
    eventReviewFilter,
  );

  return (
    <div
      className={
        'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5 max-[410px]:p-3'
      }
    >
      <div className="flex items-start gap-3">
        <UserAvatar
          className={'mt-[5px]'}
          firstName={review.author.firstName}
          lastName={review.author.lastName}
          avatarUrl={getAvatarUrl(review.author.avatarUrl)}
        />

        <div className="flex flex-col gap-0.5">
          <span className="font-medium">{`${review.author.firstName} ${review.author.lastName}`}</span>
          <div className="flex items-center gap-2 max-[410px]:flex-col max-[410px]:items-start max-[410px]:gap-0.5">
            <div className="flex items-center gap-0.5">
              <StarRating rating={review.rating} />
            </div>
            <span className={'text-muted-foreground max-[410px]:text-sm'}>
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
      <span className="font-medium text-lg max-[410px]:text-base">
        {review.title}
      </span>
      <p className={'max-[410px]:leading-5'}>{review.content}</p>
      <div
        className={
          'flex items-center gap-3 max-[450px]:flex-col max-[450px]:items-start max-[450px]:gap-2'
        }
      >
        <HelpfulButton
          markAsHelpfulMutation={markAsHelpfulMutation}
          unmarkAsHelpfulMutation={unmarkAsHelpfulMutation}
          reviewId={review.id}
          userMarkedHelpful={review.userMarkedHelpful}
          helpfulMarks={review.helpfulMarks}
        />

        <Button variant={'ghost'} onClick={() => setComplaintOpen(true)}>
          <Flag />
          <span>Пожаловаться</span>
        </Button>
      </div>

      <ComplaintDialog
        open={complaintOpen}
        onClose={() => setComplaintOpen(false)}
        reviewId={review.id}
        eventId={review.event}
      />
    </div>
  );
};
