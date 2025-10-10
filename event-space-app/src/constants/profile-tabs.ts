import { Activity, Settings, User } from 'lucide-react';
import type { Tab } from '@/types/tab.ts';

export const profileTabs: Tab[] = [
  {
    text: 'Информация',
    Icon: User
  },
  {
    text: 'Статистика',
    Icon: Activity
  },
  {
    text: 'Настройки',
    Icon: Settings
  }
]