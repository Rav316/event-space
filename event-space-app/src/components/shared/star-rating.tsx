import React from 'react';
import { Star } from 'lucide-react';

interface Props {
  rating: number;
  max?: number;
}

export const StarRating: React.FC<Props> = ({rating, max = 5}) => {
  return (
    <div className='flex gap-1'>
      {Array.from({ length: max }).map((_, i) => {
        const fillPercent = Math.min(Math.max(rating - i, 0), 1) * 100

        return (
          <div key={i} className='relative w-5 h-5'>
            <Star className='absolute inset-0 w-5 h-5 stroke-[1.3]  scale-[0.99]' />
            <div
              className='absolute inset-0 overflow-hidden'
              style={{ width: `${fillPercent}%` }}
            >
              <Star className='w-5 h-5 fill-yellow-400 text-yellow-400 scale-[1.01]' />
            </div>
          </div>

        )
      })}
    </div>
  )
}