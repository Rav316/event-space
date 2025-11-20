import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '@/src/lib/utils';

interface Props {
  className?: string;
}

export const MainLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
  className
}) => {
  return (
    <SafeAreaView className={cn('px-5', className)}>{children}</SafeAreaView>
  );
};
