import { type LucideProps } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils.ts';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  caption: string;
  iconClassName?: string;
}

export const EventBadge: React.FC<Props> = ({
  Icon,
  text,
  caption,
  iconClassName,
}) => {
  return (
    <div
      className={
        'flex items-center gap-4 bg-[#F4F2F7] p-3 rounded-2xl flex-1 min-w-0 max-[650px]:w-full max-[650px]:py-2'
      }
    >
      <Icon className={cn('shrink-0', iconClassName)} />
      <div className={'flex flex-col min-w-0'}>
        <span
          className={
            'font-medium whitespace-nowrap overflow-hidden text-ellipsis'
          }
        >
          {text}
        </span>
        <span
          className={
            'text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis'
          }
        >
          {caption}
        </span>
      </div>
    </div>
  );
};
