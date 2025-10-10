import { type LucideProps } from 'lucide-react';
import React from 'react';

interface Props {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  value: number;
  caption?: string;
}

export const UserStatisticsBlock: React.FC<Props> = ({
  title,
  Icon,
  value,
  caption,
}) => {
  return (
    <div
      className={'flex flex-1 flex-col border border-[#E5E5E5] rounded-2xl p-5 gap-3'}
    >
      <div className={'flex w-full justify-between items-center gap-4'}>
        <span className={'font-medium'}>{title}</span>
        <Icon />
      </div>
      <h3 className={'text-2xl font-semibold'}>{value}</h3>
      {caption && <span className={'text-muted-foreground'}>{caption}</span>}
    </div>
  );
};
