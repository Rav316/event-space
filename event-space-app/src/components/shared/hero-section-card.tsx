import * as React from 'react';
import type { LucideProps } from 'lucide-react';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
}

export const HeroSectionCard: React.FC<Props> = ({Icon, title, description}) => {
  return (
    <div className={'flex flex-col items-center justify-between bg-white rounded-xl p-5 shadow-md min-[599px]:h-[250px]'}>
      <Icon width={30} height={30}/>
      <span className={'font-medium text-center'}>{title}</span>
      <p className={'text-muted-foreground text-center min-[599px]:min-h-[100px]'}>{description}</p>
    </div>
  )
}