import * as React from 'react';
import type { TopOrganizerDto } from '@/api/users/model.ts';
import { UserAvatar } from '@/components/shared';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

interface Props {
  organizer: TopOrganizerDto;
  className?: string;
}

export const OrganizerCard: React.FC<Props> = ({ organizer, className }) => {
  const staticContentUrl = import.meta.env.VITE_STATIC_URL;

  const avatarUrl = organizer.avatarUrl
    ? `${staticContentUrl}${organizer.avatarUrl}`
    : undefined;

  return (
    <div
      className={cn(
        'flex items-center gap-4 p-5 rounded-2xl border border-[#E5E5E5] shadow-md transition-all duration-300',
        'hover:translate-y-[-3px] hover:shadow-lg',
        className,
      )}
    >
      <UserAvatar
        firstName={organizer.firstName}
        lastName={organizer.lastName}
        avatarUrl={avatarUrl}
        className={'h-14 w-14'}
        avatarFallbackClassName={'text-lg'}
      />
      <div className={'flex flex-col gap-y-1 min-w-0'}>
        <span className={'font-medium truncate'}>
          {organizer.firstName} {organizer.lastName}
        </span>
        <div
          className={'flex items-center gap-4 text-sm text-muted-foreground'}
        >
          <div className={'flex items-center gap-1'}>
            <Calendar className={'h-4 w-4'} />
            <span>{organizer.eventsCount} событий</span>
          </div>
        </div>
      </div>
    </div>
  );
};
