import { cn } from '@/src/lib/utils';
import React, { PropsWithChildren } from 'react';
import { Platform, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import {
    initialWindowMetrics,
    useSafeAreaInsets
} from 'react-native-safe-area-context';

interface Props {
  className?: string;
}

export const MainLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
  className
}) => {
  const insets = useSafeAreaInsets();

  const topInset =
    insets.top || initialWindowMetrics?.insets?.top || 0;
  const bottomInset =
    insets.bottom || initialWindowMetrics?.insets?.bottom || 0;

  return (
    <View style={{ paddingTop: topInset }} className={'flex-1'}>
      <KeyboardAvoidingView
        className={cn('flex-1 px-5', className)}
        behavior={'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={{ paddingBottom: bottomInset }}
      >
        {children}
      </KeyboardAvoidingView>
    </View>
  );
};
