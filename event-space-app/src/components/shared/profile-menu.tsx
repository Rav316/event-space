import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { LogOut, Settings, User } from 'lucide-react';
import { useLogout, useMe } from '@/api/auth/hooks.ts';
import { Link } from 'react-router';
import { userRoles } from '@/constants/user-roles.ts';
import { UserAvatar } from '@/components/shared/user-avatar.tsx';

interface Props {
  className?: string;
}

export const ProfileMenu: React.FC<Props> = ({ className }) => {
  const { data } = useMe();
  const logoutMutation = useLogout();
  if (!data) {
    return;
  }
  const user = data.user;

  const staticContentUrl = import.meta.env.VITE_STATIC_URL;

  const avatarUrl = user.avatarUrl
    ? `${staticContentUrl}${user.avatarUrl}`
    : false;

  return (
    <div className={cn(className, 'flex items-center')}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            firstName={user.firstName}
            lastName={user.lastName}
            avatarUrl={avatarUrl}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'w-[200px]'} collisionPadding={20}>
          <DropdownMenuLabel>
            <div className={'flex flex-col gap-y-0.5'}>
              <span>{`${user.firstName} ${user.lastName}`}</span>
              <span className={'text-xs text-muted-foreground'}>
                {userRoles[user.role]}, {user.faculty.name}, {user.course} курс
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to={'/profile'}>
            <DropdownMenuItem>
              <User />
              Профиль
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Settings />
            Настройки
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
            <LogOut />
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
