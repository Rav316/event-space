import * as React from 'react';
import type { LucideProps } from 'lucide-react';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
}

export const HeroSectionCard: React.FC<Props> = ({
  Icon,
  title,
  description,
}) => {
  return (
    <div
      className={
        'flex flex-col items-center justify-between bg-white rounded-xl p-5 border border-[#E8E8E8] hover:border-[#C8C8C8] transition-colors min-[599px]:h-[250px]'
      }
    >
      <div className="p-2.5 rounded-lg bg-[#F5F4F0]">
        <Icon width={20} height={20} />
      </div>
      <span className={'font-medium text-center'}>{title}</span>
      <p
        className={
          'text-muted-foreground text-center text-sm min-[599px]:min-h-[100px]'
        }
      >
        {description}
      </p>
    </div>
  );
};
