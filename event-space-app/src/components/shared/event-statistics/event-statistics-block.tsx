import { type LucideProps } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils.ts';

interface Props {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  value: string;
  percent: number;
  className?: string;
}

export const EventStatisticsBlock: React.FC<Props> = ({
  title,
  Icon,
  value,
  percent,
  className,
}) => {
  const isNegative = percent < 0;
  const isZero = percent === 0;
  const displayPercent = Math.abs(percent);

  const percentColor = isZero
    ? 'text-gray-500'
    : isNegative
      ? 'text-red-600'
      : 'text-green-600';
  const sign = isZero ? '' : isNegative ? '-' : '+';

  return (
    <div
      className={cn(
        'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5 w-full min-w-[300px]',
        className,
      )}
    >
      <div className="flex items-center justify-between w-full">
        <span className="font-medium text-sm">{title}</span>
        <Icon className="text-muted-foreground" />
      </div>
      <h3 className="font-medium text-2xl">{value}</h3>
      <span className="text-muted-foreground">
        <span className={percentColor}>
          {sign}
          {displayPercent}%
        </span>{' '}
        к прошлому месяцу
      </span>
    </div>
  );
};
