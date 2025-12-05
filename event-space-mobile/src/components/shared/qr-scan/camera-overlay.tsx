import React, { useState } from 'react';
import { View, Dimensions, LayoutChangeEvent } from 'react-native';
import Svg, { Rect, Mask } from 'react-native-svg';

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

const SCAN_SIZE = 250;
const RADIUS = 20;

export const CameraOverlay = () => {
  const [layout, setLayout] = useState({ width: initialWidth, height: initialHeight });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  const rectX = (layout.width - SCAN_SIZE) / 2;
  const rectY = (layout.height - SCAN_SIZE) / 2;

  return (
    <View
      pointerEvents="none"
      onLayout={onLayout}
      style={{
        position: 'absolute',
        left: 0, top: 0, right: 0, bottom: 0,
      }}
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
          x="0" y="0" width="100%" height="100%"
          fill="rgba(0,0,0,0.5)"
          mask="url(#qrMask)"
        />
      </Svg>

      <View
        style={{
          position: 'absolute',
          left: rectX,
          top: rectY,
          width: SCAN_SIZE,
          height: SCAN_SIZE,
          borderWidth: 3,
          borderColor: 'white',
          borderRadius: RADIUS,
        }}
      />
    </View>
  );
};