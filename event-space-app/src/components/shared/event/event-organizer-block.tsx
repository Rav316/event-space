import React from 'react';
import { cn } from '@/lib/utils.ts';
import { UserAvatar } from '@/components/shared';

interface Props {
  className?: string;
  firstName: string;
  lastName: string;
  faculty: string;
  avatarUrl?: string | false;
}

export const EventOrganizerBlock: React.FC<Props> = ({
  className,
  firstName,
  lastName,
  faculty,
  avatarUrl,
}) => {
  const staticContentUrl = import.meta.env.VITE_STATIC_URL;

  const avatarUrlFinal = avatarUrl ? `${staticContentUrl}${avatarUrl}` : false;
  return (
    <div
      className={cn(
        'flex flex-col gap-4 border border-[#E8E8E8] rounded-2xl p-5',
        className,
      )}
    >
      <span className={'font-medium text-xl'}>Организатор</span>
      <div className={'flex items-center gap-3'}>
        <UserAvatar
          className={'h-12 w-12'}
          firstName={firstName}
          lastName={lastName}
          avatarUrl={avatarUrlFinal}
          avatarFallbackClassName={'text-xl bg-muted'}
        />
        <div className={'flex flex-col gap-0.5'}>
          <span
            className={'font-medium text-lg'}
          >{`${firstName} ${lastName}`}</span>
          <span className={'text-muted-foreground'}>{faculty}</span>
        </div>
      </div>
    </div>
  );
};
