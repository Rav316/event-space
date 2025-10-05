import { type LucideProps } from 'lucide-react';
import React from 'react';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  caption: string;
}

export const EventBadge: React.FC<Props> = ({Icon, text, caption}) => {
  return (
    <div className={'flex items-center gap-4 bg-[#F4F2F7] p-3 rounded-2xl flex-1'}>
      <Icon/>
      <div className={'flex flex-col'}>
        <span className={'font-medium'}>{text}</span>
        <span className={'text-muted-foreground'}>{caption}</span>
      </div>
    </div>
  )
}