import { Button } from '@/components/ui';
import { Flag, Star, ThumbsUp } from 'lucide-react';
import React from 'react';
import type { EventReviewReadDto } from '@/api/event-reviews/model.ts';
import { UserAvatar } from '@/components/shared/user-avatar.tsx';

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

  console.log(formattedDate);

  return (
    <div
      className={'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5'}
    >
      <div className="flex items-center gap-3">
        <UserAvatar
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
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 scale-[1.01]" />
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 scale-[1.01]" />
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 scale-[1.01]" />
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 scale-[1.01]" />
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 scale-[1.01]" />
            </div>
            <span className="text-muted-foreground">{formattedDate}</span>
          </div>
        </div>
      </div>
      <span className="font-medium text-lg">{review.title}</span>
      <p>{review.content}</p>
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
