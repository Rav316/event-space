import * as React from 'react';
import { Badge } from '@/components/ui';
import { categoryColors } from '@/constants/category-colors.ts';
import { cn } from '@/lib/utils.ts';
import { useEventFilterStore } from '@/store/use-event-filter-store.ts';
import { useDelayedToggle } from '@/hooks/use-delayed-toggle.ts';

interface Props {
  id: number;
  text: string;
  count: number;
  isResult?: boolean;
}

export const EventCategory: React.FC<Props> = ({
  id,
  text,
  count,
  isResult,
}) => {
  const clickable = !isResult;

  const filter = useEventFilterStore((state) => state.filter);
  const addCategory = useEventFilterStore((state) => state.addCategory);
  const removeCategory = useEventFilterStore((state) => state.removeCategory);

  const { localSelected, toggle } = useDelayedToggle({
    selected: !!filter.categories?.includes(id),
    onCommit: (next) => {
      if (next) addCategory(id);
      else removeCategory(id);
    },
  });

  return (
    <div
      onClick={() => clickable && toggle()}
      className={cn(
        'flex flex-col items-center p-5 max-[460px]:p-2 gap-y-2 max-[460px]:gap-y-1 rounded-2xl w-full transition-all duration-300 select-none',
        {
          'border border-[#E5E5E5] shadow-md bg-white cursor-pointer hover:translate-y-[-3px] hover:shadow-lg':
            clickable && !localSelected,

          'border border-[#C4C4C4] translate-y-[2px] shadow-sm bg-[#F9F9FB] cursor-pointer':
            clickable && localSelected,

          'bg-[#F4F2F7] border border-[#E5E5E5] shadow-none cursor-default':
            isResult,
        },
      )}
    >
      <Badge
        className={cn(categoryColors[id - 1], {
          'border border-[#E5E5E5]': isResult,
        })}
      >
        <span className={'max-[460px]:text-xs'}>{text}</span>
      </Badge>
      <span className="font-medium text-2xl max-[460px]:text-lg">{count}</span>
      <span className="text-muted-foreground max-[460px]:text-sm">
        мероприятий
      </span>
    </div>
  );
};
