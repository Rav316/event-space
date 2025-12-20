import React from 'react';
import { Avatar, AvatarFallback, AvatarImage, StyledText } from '@/src/components/ui';

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
  avatarFallbackClassName
}) => {
  const initials =
    firstName?.trim() && lastName?.trim()
      ? `${firstName.trim()[0]}${lastName.trim()[0]}`.toUpperCase()
      : '??';

  console.log('avatar url: ', avatarUrl);

  return (
    <Avatar
      key={avatarUrl || 'no-avatar'}
      className={className}
      alt={avatarUrl || 'no-avatar'}
    >
      {avatarUrl ? (
        <AvatarImage source={{ uri: avatarUrl }} />
      ) : (
        <AvatarFallback className={avatarFallbackClassName}>
          <StyledText>{initials}</StyledText>
        </AvatarFallback>
      )}
    </Avatar>
  );
};
