import type { LucideProps } from 'lucide-react';
import React from 'react';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  isActive?: boolean;
}

export const HeaderItem: React.FC<Props> = ({
  Icon,
  text,
  isActive = false,
}) => {
  const baseColor = isActive ? 'text-black' : 'text-[#717182]';
  return (
    <div className="flex items-center gap-2 cursor-pointer group">
      <Icon
        className={`w-4 h-4 ${baseColor} transition-colors duration-300 group-hover:text-black`}
      />
      <span
        className={`${baseColor} transition-colors duration-300 group-hover:text-black text-nowrap`}
      >
        {text}
      </span>
    </div>
  );
};
