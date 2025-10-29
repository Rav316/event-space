import { Star } from 'lucide-react';
import { Progress } from '@/components/ui';
import React from 'react';

interface Props {
  rating: number;
  value: number;
  total: number;
}

export const RatingDistributionItem: React.FC<Props> = ({
  rating,
  value,
  total,
}) => {
  const progress = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className={'flex items-center gap-2'}>
      <span>5</span>
      <div className={'flex items-center gap-1'}>
        {Array.from({ length: rating }).map((_, index) => (
          <Star
            className="w-3 h-3 fill-yellow-400 text-yellow-400 scale-[1.01]"
            key={index}
          />
        ))}
      </div>
      <Progress value={progress} />
      <span className={'text-muted-foreground whitespace-nowrap'}>
        {value} ({Math.floor(progress)}%)
      </span>
    </div>
  );
};
