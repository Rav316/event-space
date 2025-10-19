import React, { type PropsWithChildren } from 'react';
import { useMe } from '@/api/auth/hooks.ts';
import { Navigate } from 'react-router';

export const RequireGuest: React.FC<PropsWithChildren> = ({ children }) => {
  const { data } = useMe();
  if (data) {
    return <Navigate to={'/'} replace={true} />;
  }
  return <>{children}</>;
};
