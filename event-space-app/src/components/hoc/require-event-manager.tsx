import React from 'react';
import { useMe } from '@/api/auth/hooks.ts';
import { Spinner } from '@/components/ui';
import Page403 from '@/pages/page-403.tsx';
import { Roles } from '@/api/auth/model.ts';

export const RequireEventManager: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data, isFetching } = useMe();

  if (isFetching) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data || (data.user.role !== Roles.ORGANIZER && data.user.role !== Roles.ADMIN)) {
    return <Page403 />;
  }

  return <>{children}</>;
};
