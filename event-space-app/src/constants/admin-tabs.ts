import type { Tab } from '@/types/tab.ts';
import { Calendar, ChartColumn, MessageSquare, Users } from 'lucide-react';

export const adminTabs: Tab[] = [
  {
    text: 'Обзор',
    Icon: ChartColumn,
  },
  {
    text: 'Пользователи',
    Icon: Users,
  },
  {
    text: 'Мероприятия',
    Icon: Calendar,
  },
  {
    text: 'Жалобы',
    Icon: MessageSquare,
  },
];
