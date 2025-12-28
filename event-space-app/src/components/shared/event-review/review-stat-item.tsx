import { StarRating } from '@/components/shared';
import { Badge, Button } from '@/components/ui';
import { Calendar, ExternalLink, Users } from 'lucide-react';
import React from 'react';
import type { EventCategory } from '@/api/event-categories/model.ts';
import { categoryColors } from '@/constants/category-colors.ts';
import { formatDateToRuFormat } from '@/utils/format-date-to-ru-format.ts';
import { timeAgo } from '@/utils/time-ago.ts';
import { useNavigate } from 'react-router';

interface Props {
  eventId: number;
  name: string;
  category: EventCategory;
  date: string;
  participantQuantity: number;
  rating: number;
  content: string;
  createdAt: string;
}

export const ReviewStatItem: React.FC<Props> = ({
  eventId,
  name,
  category,
  date,
  participantQuantity,
  rating,
  content,
  createdAt,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        'flex flex-col gap-2 border border-[#E5E5E5] rounded-2xl p-5 bg-[#F9F9F9] hover:border-[#C4C4C4] transition-all duration-300'
      }
    >
      <div className={'flex items-center gap-2 justify-between'}>
        <span className={'font-medium'}>{name}</span>
        <StarRating rating={rating} starSize={15} className={'gap-1'} />
      </div>
      <div
        className={
          'flex items-center gap-2 max-[475px]:flex-col max-[475px]:items-start'
        }
      >
        <Badge variant={'outline'} className={categoryColors[category.id - 1]}>
          {category.name}
        </Badge>
        <div className={'flex items-center gap-2'}>
          <div className={'flex items-center gap-2'}>
            <Calendar className={'text-muted-foreground'} size={15} />
            <span className={'text-muted-foreground text-sm'}>
              {formatDateToRuFormat(date)}
            </span>
          </div>
          <div className={'flex items-center gap-2'}>
            <Users className={'text-muted-foreground'} size={15} />
            <span className={'text-muted-foreground text-sm'}>
              {participantQuantity} участников
            </span>
          </div>
        </div>
      </div>
      <p className={'max-[410px]:leading-5 break-words'}>
        {content.length > 225 ? content.slice(0, 225) + '…' : content}
      </p>
      <div
        className={
          'flex items-center gap-2 justify-between max-[500px]:flex-col max-[500px]:items-start'
        }
      >
        <span className={'text-muted-foreground text-sm'}>
          {timeAgo(createdAt)}
        </span>
        <Button
          className={'max-[500px]:w-full'}
          variant={'ghost'}
          onClick={() => navigate(`/events/${eventId}`)}
        >
          <span className={'text-sm'}>Перейти к событию</span>
          <ExternalLink size={13} />
        </Button>
      </div>
    </div>
  );
};
