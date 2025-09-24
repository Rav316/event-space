import React from 'react';
import { Calendar, Clock, FileText, type LucideProps, MapPin, Upload, Users } from 'lucide-react';

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
    Icon: Users,
    text: 'Участники',
  },
  {
    Icon: Upload,
    text: 'Медиа и настройки',
  },
];