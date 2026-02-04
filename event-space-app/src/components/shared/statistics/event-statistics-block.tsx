import { type LucideProps } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils.ts';
import { AnimatedNumber } from '@/components/ui';

interface Props {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  value: number | string;
  delta: number;
  isPercent?: boolean;
  className?: string;
}

export const EventStatisticsBlock: React.FC<Props> = ({
  title,
  Icon,
  value,
  delta,
  isPercent = false,
  className,
}) => {
  const isNegative = delta < 0;
  const isZero = delta === 0;
  const displayDelta = Math.abs(delta);

  const percentColor = isZero
    ? 'text-gray-500'
    : isNegative
      ? 'text-red-600'
      : 'text-green-600';
  const sign = isZero ? '' : isNegative ? '-' : '+';

  return (
    <div
      className={cn(
        'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5 w-full min-w-[300px] max-[680px]:gap-1',
        className,
      )}
    >
      <div className="flex items-center justify-between w-full">
        <span className="font-medium text-sm">{title}</span>
        <Icon className="text-muted-foreground" />
      </div>
      <h3 className="font-medium text-2xl">
        {typeof value === 'number' ? (
          <AnimatedNumber value={value} />
        ) : (
          (() => {
            const match = String(value).match(/^([\d.]+)(.*)$/);
            if (match) {
              const num = parseFloat(match[1]);
              const suffix = match[2];
              const decimals = match[1].includes('.') ? (match[1].split('.')[1]?.length ?? 0) : 0;
              return <AnimatedNumber value={num} decimals={decimals} suffix={suffix} />;
            }
            return value;
          })()
        )}
      </h3>
      <span className="text-muted-foreground">
        <span className={percentColor}>
          {sign}
          {!isPercent ? `${displayDelta}` : `${displayDelta * 100}%`}
        </span>{' '}
        к прошлому месяцу
      </span>
    </div>
  );
};
