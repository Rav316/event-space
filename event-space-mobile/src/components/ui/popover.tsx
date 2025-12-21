import { NativeOnlyAnimatedView } from '@/src/components/ui/native-only-animated-view';
import { TextClassContext } from '@/src/components/ui/styled-text';
import { cn } from '@/src/lib/utils';
import * as PopoverPrimitive from '@rn-primitives/popover';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';

const PopoverContext = React.createContext<{
  triggerWidth: number;
  setTriggerWidth: React.Dispatch<React.SetStateAction<number>>;
}>({
  triggerWidth: 0,
  setTriggerWidth: () => {}
});

const Popover = ({ children, ...props }: PopoverPrimitive.RootProps) => {
  const [triggerWidth, setTriggerWidth] = React.useState(0);
  return (
    <PopoverContext.Provider value={{ triggerWidth, setTriggerWidth }}>
      <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = React.forwardRef<
  PopoverPrimitive.TriggerRef,
  PopoverPrimitive.TriggerProps
>(({ onLayout, ...props }, ref) => {
  const { setTriggerWidth } = React.useContext(PopoverContext);
  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setTriggerWidth(width);
        onLayout?.(event);
      }}
      {...props}
    />
  );
});
PopoverTrigger.displayName = 'PopoverTrigger';

const FullWindowOverlay =
  Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  portalHost,
  style,
  side,
  ...props
}: PopoverPrimitive.ContentProps &
  React.RefAttributes<PopoverPrimitive.ContentRef> & {
    portalHost?: string;
  }) {
  const { triggerWidth } = React.useContext(PopoverContext);
  const isWeb = Platform.OS === 'web';
  const additionalClass = isWeb ? 'w-[var(--radix-popover-trigger-width)]' : '';
  const additionalStyle =
    !isWeb && triggerWidth > 0 ? { width: triggerWidth } : {};
  const finalStyle = StyleSheet.flatten([additionalStyle, style]);
  return (
    <PopoverPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <PopoverPrimitive.Overlay
          style={Platform.select({ native: StyleSheet.absoluteFill })}
        >
          <NativeOnlyAnimatedView
            entering={FadeIn.duration(200)}
            exiting={FadeOut}
          >
            <TextClassContext.Provider value="text-popover-foreground">
              <PopoverPrimitive.Content
                align={align}
                sideOffset={sideOffset}
                className={cn(
                  'bg-popover border-border outline-hidden z-50 rounded-md border p-4 shadow-md shadow-black/5',
                  Platform.select({
                    web: cn(
                      'animate-in fade-in-0 zoom-in-95 origin-(--radix-popover-content-transform-origin) cursor-auto',
                      side === 'bottom' && 'slide-in-from-top-2',
                      side === 'top' && 'slide-in-from-bottom-2'
                    )
                  }),
                  additionalClass,
                  className
                )}
                style={finalStyle}
                side={side}
                {...props}
              />
            </TextClassContext.Provider>
          </NativeOnlyAnimatedView>
        </PopoverPrimitive.Overlay>
      </FullWindowOverlay>
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverContent, PopoverTrigger };
