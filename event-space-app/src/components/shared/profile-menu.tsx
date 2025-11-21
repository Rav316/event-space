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
import { useMe } from '@/api/auth/hooks.ts';
import { Link, useNavigate } from 'react-router';
import { userRoles } from '@/constants/user-roles.ts';
import { UserAvatar } from '@/components/shared';
import { useAuthStore } from '@/store/use-auth-store.ts';
import { queryClient } from '@/api/query-client.ts';
import { showLogoutSuccess } from '@/components/shared/toast-logout.tsx';

interface Props {
  className?: string;
}

export const ProfileMenu: React.FC<Props> = ({ className }) => {
  const { data } = useMe();
  const navigate = useNavigate();
  const removeTokens = useAuthStore((state) => state.removeTokens);

  if (!data) {
    return;
  }
  const user = data.user;

  const staticContentUrl = import.meta.env.VITE_STATIC_URL;

  const avatarUrl = user.avatarUrl
    ? `${staticContentUrl}${user.avatarUrl}`
    : false;

  const onLogout = () => {
    navigate('/', {replace: true});
    setTimeout(() => {
      removeTokens();
      queryClient.clear();
    }, 100);
    showLogoutSuccess();
  }

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
          <DropdownMenuItem onClick={onLogout}>
            <LogOut />
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
