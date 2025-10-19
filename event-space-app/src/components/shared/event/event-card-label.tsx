import * as React from 'react';
import type { LucideProps } from 'lucide-react';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
}

export const EventCardLabel: React.FC<Props> = ({ Icon, text }) => {
  return (
    <div className={'flex items-center gap-2'}>
      <Icon className={'w-4 h-4'} />
      <span className={'text-muted-foreground'}>{text}</span>
    </div>
  );
};
