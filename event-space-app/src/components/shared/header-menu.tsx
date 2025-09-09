import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui';
import { Calendar, ChartColumn, History, Menu, Users } from 'lucide-react';
import * as React from 'react';

interface Props {
  className?: string;
}

export const HeaderMenu: React.FC<Props> = ({className}) => {
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 rounded hover:bg-gray-200 transition-colors duration-200">
          <Menu width={20} height={20}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'min-w-[200px]'}>
          <DropdownMenuLabel>
            Навигация
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Calendar/>
            Мероприятия
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users/>
            Мои регистрации
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ChartColumn/>
            Статистика
          </DropdownMenuItem>
          <DropdownMenuItem>
            <History/>
            История
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}