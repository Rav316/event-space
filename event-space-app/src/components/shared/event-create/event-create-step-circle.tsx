import React from 'react';
import { Check, type LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import type { EventCreateStep } from '@/types/event-create-step.ts';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  variant?: EventCreateStep;
}

export const EventCreateStepCircle: React.FC<Props> = ({
  Icon,
  text,
  variant = 'default',
}) => {
  return (
    <div className={'flex flex-col items-center gap-1'}>
      {variant === 'completed' ? (
        <div
          className={
            'flex justify-center items-center rounded-full w-10 h-10 bg-[#00C950]'
          }
        >
          <Check className={'text-white'} />
        </div>
      ) : (
        <div
          className={cn(
            'flex justify-center items-center rounded-full w-10 h-10',
            {
              'bg-primary': variant === 'active',
              'bg-[#F5F5F5]': variant === 'default',
            },
          )}
        >
          <Icon
            className={cn('w-5 h-5', {
              'text-white': variant === 'active',
              'text-muted-foreground': variant === 'default',
            })}
          />
        </div>
      )}

      <span className={'font-medium text-xs max-[800px]:hidden'}>{text}</span>
    </div>
  );
};
