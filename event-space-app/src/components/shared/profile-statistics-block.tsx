import { type LucideProps } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils.ts';

interface Props {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  iconClassName?: string;
  className?: string;
  value: number | string;
}

export const ProfileStatisticsBlock: React.FC<Props> = ({
  title,
  Icon,
  value,
  iconClassName,
  className,
}) => {
  return (
    <div
      className={
        'flex items-center border border-[#E5E5E5] rounded-2xl p-3 gap-3 max-[800px]:flex-1 max-[615px]:py-2'
      }
    >
      <div
        className={cn(
          'w-8 h-8 flex rounded-sm items-center justify-center',
          className,
        )}
      >
        <Icon className={cn('h-5 w-5', iconClassName)} />
      </div>
      <div className="flex h-8 flex-col justify-center">
        <span className="text-muted-foreground text-xs leading-tight">
          {title}
        </span>
        <h3 className="font-semibold text-sm leading-tight">{value}</h3>
      </div>
    </div>
  );
};
