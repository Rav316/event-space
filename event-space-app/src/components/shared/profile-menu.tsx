import * as React from 'react';
import {
  Avatar,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { LogOut, Settings, User } from 'lucide-react';
import { queryClient } from '@/api/query-client.ts';
import { AUTH_KEYS } from '@/api/auth/keys.ts';
import { useAuthStore } from '@/store/use-auth-store.ts';
import { toast } from 'sonner';

interface Props {
  className?: string;
}

export const ProfileMenu: React.FC<Props> = ({ className }) => {
  const setToken = useAuthStore((s) => s.setToken);

  const onClickLogout = () => {
    setToken(null);
    queryClient.removeQueries({queryKey: AUTH_KEYS.me});
    toast.success('Вы успешно вышли из системы');
  }

  return (
    <div className={cn(className, 'flex items-center')}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={'https://avatars.githubusercontent.com/u/118563959?v=4'}
            />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'max-w-[200px]'} collisionPadding={20}>
          <DropdownMenuLabel>
            <div className={'flex flex-col gap-y-0.5'}>
              <span>Rav316</span>
              <span className={'text-xs text-muted-foreground'}>
                Студент, информационные технологии, 3 курс
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User/>
            Профиль
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings/>
            Настройки
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClickLogout}>
            <LogOut/>
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
