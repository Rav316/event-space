import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

export const ReviewRatingInput = () => {
  const [hovered, setHovered] = useState<number | null>(null)
  const [selected, setSelected] = useState<number>(0)

  return (
    <div className='flex gap-2'>
      {[1, 2, 3, 4, 5].map((rating) => {
        const isActive = rating <= (hovered ?? selected)
        const isHovered = hovered === rating

        return (
          <Star
            key={rating}
            onMouseEnter={() => setHovered(rating)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(rating)}
            size={25}
            className={cn(
              'cursor-pointer transition-transform duration-150 stroke-[1.5]',
              isActive
                ? 'fill-yellow-400 stroke-yellow-400'
                : 'fill-transparent stroke-black',
              isHovered ? 'scale-110' : 'scale-100'
            )}
          />
        )
      })}
    </div>
  )
}