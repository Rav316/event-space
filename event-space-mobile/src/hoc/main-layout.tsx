import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '@/src/lib/utils';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { Platform } from 'react-native';

interface Props {
  className?: string;
}

export const MainLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
  className
}) => {
  return (
    <SafeAreaView className={'flex-1'}>
      <KeyboardAvoidingView
        className={cn('px-5', className)}
        behavior={'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
