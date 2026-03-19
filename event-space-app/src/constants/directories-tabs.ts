import type { Tab } from '@/types/tab.ts';
import { Building2, DoorOpen, MapPin, Tags } from 'lucide-react';

export const directoriesTabs: Tab[] = [
  {
    text: 'Локации',
    Icon: MapPin,
  },
  {
    text: 'Пространства',
    Icon: DoorOpen,
  },
  {
    text: 'Категории',
    Icon: Tags,
  },
  {
    text: 'Факультеты',
    Icon: Building2,
  },
];
