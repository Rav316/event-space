import { type LucideProps } from 'lucide-react';
import React from 'react';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  caption: string;
}

export const EventBadge: React.FC<Props> = ({ Icon, text, caption }) => {
  return (
    <div className={'flex items-center gap-4 bg-[#F4F2F7] p-3 rounded-2xl flex-1 min-w-0 max-[650px]:w-full max-[650px]:py-2'}>
      <Icon className='shrink-0' />
      <div className={'flex flex-col min-w-0'}>
        <span className={'font-medium whitespace-nowrap overflow-hidden text-ellipsis'}>
          {text}
        </span>
        <span className={'text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis'}>
          {caption}
        </span>
      </div>
    </div>
  )
}
