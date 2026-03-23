import * as React from 'react';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { useEventFilterStore } from '@/store/use-event-filter-store.ts';
import { useDelayedToggle } from '@/hooks/use-delayed-toggle.ts';
import { categoryBadgeStyle } from '@/utils/category-badge-style.ts';

interface Props {
  id: number;
  text: string;
  count: number;
  color?: string;
  isResult?: boolean;
}

export const EventCategory: React.FC<Props> = ({
  id,
  text,
  count,
  color,
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
          'border border-[#E8E8E8] bg-white cursor-pointer hover:border-[#C8C8C8]':
            clickable && !localSelected,

          'border border-[#C4C4C4] bg-[#F9F9FB] cursor-pointer':
            clickable && localSelected,

          'bg-[#F7F5F0] border border-[#E8E8E8] cursor-default':
            isResult,
        },
      )}
    >
      <Badge
        className={cn({ 'border border-[#E5E5E5]': isResult })}
        style={!isResult && color ? categoryBadgeStyle(color) : undefined}
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
