import React, { useState } from 'react';
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
  const [imageError, setImageError] = useState(false);

  const initials =
    firstName?.trim() && lastName?.trim()
      ? `${firstName.trim()[0]}${lastName.trim()[0]}`.toUpperCase()
      : '??';

  const showImage = avatarUrl && !imageError;

  return (
    <Avatar className={className}>
      {showImage && (
        <AvatarImage src={avatarUrl} onError={() => setImageError(true)} />
      )}

      <AvatarFallback className={avatarFallbackClassName}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
