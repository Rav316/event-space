import * as React from 'react';
import type { LucideProps } from 'lucide-react';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
}

export const HeaderItem: React.FC<Props> = ({ Icon, text }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer group">
      <Icon className="w-4 h-4 text-[#717182] transition-colors duration-300 group-hover:text-black" />
      <span className="text-[#717182] transition-colors duration-300 group-hover:text-black text-nowrap">
        {text}
      </span>
    </div>
  );
};
