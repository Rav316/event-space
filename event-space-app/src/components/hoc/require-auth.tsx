import React from 'react';
import { useMe } from '@/api/auth/hooks.ts';
import Page403 from '@/pages/page-403.tsx';
import { Loader2 } from 'lucide-react';

export const RequireAuth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data, isFetching } = useMe();

  if (isFetching) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (!data) {
    return <Page403 />;
  }

  return <>{children}</>;
};
