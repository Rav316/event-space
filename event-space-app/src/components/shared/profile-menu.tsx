import * as React from 'react';
import {
  Avatar, AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { LogOut, Settings, User } from 'lucide-react';
import { useLogout, useMe } from '@/api/auth/hooks.ts';
import { Link } from 'react-router';
import { userRoles } from '@/constants/user-roles.ts';

interface Props {
  className?: string;
}

export const ProfileMenu: React.FC<Props> = ({ className }) => {
  const {data} = useMe();
  const logoutMutation = useLogout();
  if(!data) {
    return;
  }
  const user = data.user;

  const staticContentUrl = import.meta.env.VITE_STATIC_URL;

  console.log('user avatar url', user.avatarUrl);

  return (
    <div className={cn(className, 'flex items-center')}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar key={user.avatarUrl || 'no-avatar'}>
            {user.avatarUrl ? (
              <AvatarImage src={`${staticContentUrl}${user.avatarUrl}`} />
            ) : (
              <AvatarFallback>
                {user.firstName?.trim() && user.lastName?.trim()
                  ? `${user.firstName.trim()[0]}${user.lastName.trim()[0]}`.toUpperCase()
                  : '??'}
              </AvatarFallback>
            )}
          </Avatar>
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
              <User/>
              Профиль
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Settings/>
            Настройки
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
            <LogOut/>
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
