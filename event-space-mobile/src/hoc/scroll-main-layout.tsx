import React, { PropsWithChildren } from 'react';
import {
  initialWindowMetrics,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { View } from 'react-native';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-controller';

interface Props {
  className?: string;
}

export const ScrollMainLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
  className
}) => {
  const insets = useSafeAreaInsets();

  const topInset = insets.top || initialWindowMetrics?.insets?.top || 0;
  const bottomInset =
    insets.bottom || initialWindowMetrics?.insets?.bottom || 0;

  return (
    <View
      className={'flex-1 px-5'}
      style={{ paddingBottom: bottomInset, paddingTop: topInset }}
    >
      <KeyboardAwareScrollView
        bottomOffset={bottomInset}
        contentContainerClassName={className}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};