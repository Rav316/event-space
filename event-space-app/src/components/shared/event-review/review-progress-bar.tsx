import React from 'react';
import { Star } from 'lucide-react';
import { Progress } from '@/components/ui';

interface Props {
  rating: number;
  count: number;
  total: number;
}

export const ReviewProgressBar: React.FC<Props> = ({
  rating,
  count,
  total,
}) => {
  const progress = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center w-full gap-4">
      <span className="w-6 text-right">{rating}</span>

      <div className="flex items-center flex-1 gap-2">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 shrink-0" />
        <Progress
          className="flex-1 [&>div]:bg-yellow-400 h-2"
          value={progress}
        />
      </div>

      <span className="text-muted-foreground text-right">{count}</span>
    </div>
  );
};
