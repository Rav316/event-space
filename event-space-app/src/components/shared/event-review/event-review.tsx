import { Button } from '@/components/ui';
import { Flag, ThumbsUp } from 'lucide-react';
import React from 'react';
import type { EventReviewReadDto } from '@/api/event-reviews/model.ts';
import { UserAvatar, StarRating } from '@/components/shared';

interface Props {
  review: EventReviewReadDto;
}

export const EventReview: React.FC<Props> = ({ review }) => {
  const staticContentUrl = import.meta.env.VITE_STATIC_URL;
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
          avatarUrl={
            review.author.avatarUrl
              ? `${staticContentUrl}${review.author.avatarUrl}`
              : false
          }
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
        <Button variant={'ghost'}>
          <ThumbsUp />
          <span>Полезно (10)</span>
        </Button>
        <Button variant={'ghost'}>
          <Flag />
          <span>Пожаловаться</span>
        </Button>
      </div>
    </div>
  );
};
