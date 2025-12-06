import { TorchButton } from '@/src/components/shared/qr-scan/torch-button';
import { ChevronLeft, ImageIcon } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    LayoutChangeEvent,
    Pressable,
    Text,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Mask, Rect } from 'react-native-svg';

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

const SCAN_SIZE = 250;
const RADIUS = 20;
const ROI_SCALE = 1; // percentage of visual square used for actual scanning

export type RegionOfInterest = {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface Props {
  onBack: () => void;
  isTorchActive: boolean;
  onToggleTorch: () => void;
  onOpenGallery: () => void;
  onRegionChange?: (region: RegionOfInterest) => void;
}

export const CameraOverlay: React.FC<Props> = ({
  onBack,
  isTorchActive,
  onToggleTorch,
  onOpenGallery,
  onRegionChange
}) => {
  const insets = useSafeAreaInsets();
  const [layout, setLayout] = useState({
    width: initialWidth,
    height: initialHeight
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  const rectX = (layout.width - SCAN_SIZE) / 2;
  const rectY = (layout.height - SCAN_SIZE) / 2;

  const roiWidth = SCAN_SIZE * ROI_SCALE;
  const roiHeight = SCAN_SIZE * ROI_SCALE;
  const roiX = rectX + (SCAN_SIZE - roiWidth) / 2;
  const roiY = rectY + (SCAN_SIZE - roiHeight) / 2;

  useEffect(() => {
    if (!onRegionChange || layout.width === 0 || layout.height === 0) {
      return;
    }

    onRegionChange({
      x: roiX / layout.width,
      y: roiY / layout.height,
      width: roiWidth / layout.width,
      height: roiHeight / layout.height
    });
  }, [
    layout.width,
    layout.height,
    onRegionChange,
    rectX,
    rectY,
    roiHeight,
    roiWidth,
    roiX,
    roiY
  ]);

  return (
    <>
      <Pressable
        onPress={onBack}
        className="absolute left-4 w-11 h-11 rounded-full bg-black/60 items-center justify-center z-20"
        style={{ top: insets.top + 12 }}
      >
        <ChevronLeft
          className={'text-white z-10'}
          color={'white'}
          style={{ marginLeft: -3 }}
        />
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
            borderRadius: RADIUS
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

        <TorchButton isActive={isTorchActive} onToggle={onToggleTorch} />

        <Pressable
          onPress={onOpenGallery}
          className="w-14 h-14 rounded-full bg-black/60 items-center justify-center"
        >
          <ImageIcon color="white" />
        </Pressable>
      </View>
    </>
  );
};
