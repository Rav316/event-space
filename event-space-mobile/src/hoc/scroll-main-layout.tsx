import React, { PropsWithChildren } from 'react';
import {
  initialWindowMetrics,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { RefreshControl, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

interface Props {
  className?: string;

  refreshing?: boolean;
  onRefresh?: () => void | Promise<void>;
}

export const ScrollMainLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  refreshing = false,
  onRefresh
}) => {
  const insets = useSafeAreaInsets();

  const topInset = insets.top || initialWindowMetrics?.insets?.top || 0;
  const bottomInset =
    insets.bottom || initialWindowMetrics?.insets?.bottom || 0;

  return (
    <View
      className="flex-1 px-5"
      style={{ paddingBottom: bottomInset, paddingTop: topInset }}
    >
      <KeyboardAwareScrollView
        bottomOffset={bottomInset}
        contentContainerClassName={className}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};
