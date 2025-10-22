import React from 'react';
import type { LucideProps } from 'lucide-react';

export type Tab = {
  text: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
};
