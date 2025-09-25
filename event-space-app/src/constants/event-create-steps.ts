import React from 'react';
import { Calendar, Clock, FileText, type LucideProps, MapPin, Upload } from 'lucide-react';

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
    Icon: Upload,
    text: 'Медиа и настройки',
  },
];