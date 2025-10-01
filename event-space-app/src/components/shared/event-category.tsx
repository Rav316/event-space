import * as React from 'react';
import { Badge } from '@/components/ui';
import { categoryColors } from '@/constants/category-colors.ts';
import { cn } from '@/lib/utils.ts';
import { useState } from 'react';

interface Props {
  text: string;
  color: keyof typeof categoryColors;
  count: number;
  isResult?: boolean;
}

export const EventCategory: React.FC<Props> = ({
  text,
  color,
  count,
  isResult,
}) => {
  const [selected, setSelected] = useState(false);

  const clickable = !isResult; // результат нельзя нажимать

  return (
    <div
      onClick={() => clickable && setSelected((prev) => !prev)}
      className={cn(
        'flex flex-col items-center p-5 gap-y-2 rounded-2xl w-full transition-all duration-300 select-none',
        {
          'border border-[#E5E5E5] shadow-md bg-white cursor-pointer hover:translate-y-[-3px] hover:shadow-lg':
            clickable && !selected,

          'border border-[#C4C4C4] translate-y-[2px] shadow-sm bg-[#F9F9FB] cursor-pointer':
            clickable && selected,

          'bg-[#F4F2F7] border border-[#E5E5E5] shadow-none cursor-default':
          isResult,
        },
      )}
    >
      <Badge
        className={cn(categoryColors[color], { 'border border-[#E5E5E5]': isResult })}
      >
        {text}
      </Badge>
      <span className="font-medium text-2xl">{count}</span>
      <span className="text-muted-foreground">мероприятий</span>
    </div>
  );
};
