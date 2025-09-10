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

interface Props {
  className?: string;
}

export const ProfileMenu: React.FC<Props> = ({ className }) => {
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
          <DropdownMenuItem>
            <LogOut/>
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
