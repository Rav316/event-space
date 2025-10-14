import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';

interface Props {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | false;
  className?: string;
  avatarFallbackClassName?: string;
}

export const UserAvatar: React.FC<Props> = ({
  firstName,
  lastName,
  avatarUrl,
  className,
  avatarFallbackClassName,
}) => {
  const initials =
    firstName?.trim() && lastName?.trim()
      ? `${firstName.trim()[0]}${lastName.trim()[0]}`.toUpperCase()
      : '??';

  return (
    <Avatar key={avatarUrl || 'no-avatar'} className={className}>
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} />
      ) : (
        <AvatarFallback className={avatarFallbackClassName}>
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );
};
