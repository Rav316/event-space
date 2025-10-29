import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

interface Props {
  rating: number;
  max?: number;
  className?: string;
  starSize?: number;
}

export const StarRating: React.FC<Props> = ({
  rating,
  max = 5,
  className,
  starSize = 20,
}) => {
  return (
    <div className={cn('flex gap-1 items-center', className)}>
      {Array.from({ length: max }).map((_, i) => {
        const fillPercent = Math.min(Math.max(rating - i, 0), 1) * 100;

        return (
          <div
            key={i}
            className="relative flex items-center justify-center"
            style={{ width: starSize, height: starSize }}
          >
            <Star size={starSize} className="absolute inset-0 stroke-[1.3]" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <Star
                size={starSize}
                className="fill-yellow-400 text-yellow-400"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
