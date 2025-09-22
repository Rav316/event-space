import React, { type PropsWithChildren } from 'react';
import { useMe } from '@/api/auth/hooks.ts';
import Page403 from '@/pages/page-403.tsx';

export const RequireAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const { data, isFetching } = useMe();
  console.log(data);
  if (!isFetching && !data) {
    return <Page403/>
  }
  return <>{children}</>;
};
