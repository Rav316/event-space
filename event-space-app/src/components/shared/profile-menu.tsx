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
import { useLogout, useMe } from '@/api/auth/hooks.ts';
import { Link } from 'react-router';

interface Props {
  className?: string;
}

export const ProfileMenu: React.FC<Props> = ({ className }) => {
  const {data} = useMe();
  const logoutMutation = useLogout();

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
        <DropdownMenuContent className={'w-[200px]'} collisionPadding={20}>
          <DropdownMenuLabel>
            <div className={'flex flex-col gap-y-0.5'}>
              <span>{`${data?.user.firstName} ${data?.user.lastName}`}</span>
              <span className={'text-xs text-muted-foreground'}>
                Участник, {data?.user.faculty.name}, {data?.user.course} курс
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
