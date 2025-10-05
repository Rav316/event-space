import * as React from 'react';
import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils.ts';

interface Props {
  className?: string;
}

export const Wrapper: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={'w-full flex justify-center px-[20px]'}>
      <div className={cn('w-full max-w-[1720px]', className)}>{children}</div>
    </div>
  );
};
