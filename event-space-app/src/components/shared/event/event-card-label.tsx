import * as React from 'react';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  iconClassName?: string;
}

export const EventCardLabel: React.FC<Props> = ({
  Icon,
  text,
  iconClassName,
}) => {
  return (
    <div className={'flex items-center gap-2'}>
      <Icon className={cn('w-4 h-4', iconClassName)} />
      <span className={'text-muted-foreground'}>{text}</span>
    </div>
  );
};
