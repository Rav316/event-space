import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { Briefcase, Calendar, ChartColumn, Menu, Users } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router';
import { useMe } from '@/api/auth/hooks.ts';
import { Roles } from '@/api/auth/model.ts';

interface Props {
  className?: string;
}

export const NavigationMenu: React.FC<Props> = ({ className }) => {
  const { data } = useMe();
  const isEventManager = data?.user.role === Roles.ADMIN || data?.user.role === Roles.ORGANIZER;

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 rounded hover:bg-gray-200 transition-colors duration-200">
          <Menu width={20} height={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'min-w-[200px]'} collisionPadding={20}>
          <DropdownMenuLabel>Навигация</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to={'/events'}>
            <DropdownMenuItem>
              <Calendar />
              Все мероприятия
            </DropdownMenuItem>
          </Link>
          {isEventManager && (
            <Link to={'/my-events'}>
              <DropdownMenuItem>
                <Briefcase />
                Мои мероприятия
              </DropdownMenuItem>
            </Link>
          )}
          <Link to={'/my-registrations'}>
            <DropdownMenuItem>
              <Users />
              Мои регистрации
            </DropdownMenuItem>
          </Link>
          <Link to={'/statistics'}>
            <DropdownMenuItem>
              <ChartColumn />
              Статистика
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
