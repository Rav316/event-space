import React from 'react';
import {
  Calendar,
  Clock,
  FileText,
  Image,
  type LucideProps,
  MapPin,
} from 'lucide-react';

export const eventCreateSteps: {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
}[] = [
  {
    Icon: FileText,
    text: 'Основная информация',
  },
  {
    Icon: Calendar,
    text: 'Дата и время',
  },
  {
    Icon: Clock,
    text: 'Программа',
  },
  {
    Icon: MapPin,
    text: 'Место проведения',
  },
  {
    Icon: Image,
    text: 'Медиа и настройки',
  },
];
