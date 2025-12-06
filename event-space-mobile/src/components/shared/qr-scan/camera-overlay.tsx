import React, { useState } from 'react';
import { View, Pressable, Dimensions, LayoutChangeEvent, Text } from 'react-native';
import Svg, { Rect, Mask } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Flashlight, ImageIcon } from 'lucide-react-native';

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

const SCAN_SIZE = 250;
const RADIUS = 20;

interface Props {
  onBack: () => void;
  onToggleTorch: () => void;
}

export const CameraOverlay: React.FC<Props> = ({onBack, onToggleTorch}) => {
  const insets = useSafeAreaInsets();
  const [layout, setLayout] = useState({ width: initialWidth, height: initialHeight });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  const rectX = (layout.width - SCAN_SIZE) / 2;
  const rectY = (layout.height - SCAN_SIZE) / 2;

  return (
    <>
      <Pressable
        onPress={onBack}
        className="absolute left-4 w-11 h-11 rounded-full bg-black/60 items-center justify-center z-20"
        style={{ top: insets.top + 12 }}
      >
        <ChevronLeft className={'text-white z-10'} color={'white'} style={{ marginLeft: -3 }}/>
      </Pressable>

      <View
        pointerEvents="none"
        onLayout={onLayout}
        className="absolute inset-0"
      >
        <Svg height="100%" width="100%">
          <Mask id="qrMask">
            <Rect x="0" y="0" width="100%" height="100%" fill="white" />
            <Rect
              x={rectX}
              y={rectY}
              width={SCAN_SIZE}
              height={SCAN_SIZE}
              rx={RADIUS}
              ry={RADIUS}
              fill="black"
            />
          </Mask>

          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.5)"
            mask="url(#qrMask)"
          />
        </Svg>

        <View
          className="absolute border-[3px] border-white"
          style={{
            left: rectX,
            top: rectY,
            width: SCAN_SIZE,
            height: SCAN_SIZE,
            borderRadius: RADIUS,
          }}
        />
      </View>

      <View
        className="absolute w-full items-center"
        style={{ top: rectY + SCAN_SIZE + 24 }}
      >
        <Text className="text-white text-base font-medium">
          Отсканируйте QR-код события
        </Text>
      </View>

      <View
        className="absolute w-full flex-row justify-center gap-6"
        style={{ bottom: insets.bottom + 32 }}
      >
        {/* Фонарик */}
        <Pressable
          onPress={onToggleTorch}
          className="w-14 h-14 rounded-full bg-black/60 items-center justify-center"
        >
          <Flashlight color="white" />
        </Pressable>

        {/* Галерея */}
        <Pressable
          onPress={() => {}}
          className="w-14 h-14 rounded-full bg-black/60 items-center justify-center"
        >
          <ImageIcon color="white" />
        </Pressable>
      </View>
    </>
  );
};
