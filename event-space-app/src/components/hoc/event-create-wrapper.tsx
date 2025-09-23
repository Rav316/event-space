import React, { type PropsWithChildren } from 'react';
import type { LucideProps } from 'lucide-react';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
}

export const EventCreateWrapper: React.FC<PropsWithChildren<Props>> = ({
  children,
  Icon,
  text,
}) => {
  return (
    <div className={'flex flex-col gap-4 p-5 border border-[#E5E5E5] rounded-md'}>
      <div className={'flex items-center gap-2 mb-4'}>
        <Icon className={'w-5 h-5'} />
        <span className={'font-medium'}>{text}</span>
      </div>
      {children}
    </div>
  );
};
