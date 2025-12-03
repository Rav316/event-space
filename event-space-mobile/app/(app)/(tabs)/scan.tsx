import { MainLayout } from '@/src/hoc';
import { StyledButton, StyledText } from '@/src/components/ui';
import { Camera, Point, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { StyleSheet } from 'react-native';
import { useRef } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';


const ScanScreen = () => {
  const camera = useRef<Camera>(null)
  const {hasPermission, requestPermission} = useCameraPermission();

  const device = useCameraDevice('back');

  const focus = async (point: Point) => {
    const c = camera.current;
    if (!c) return;
    await c.focus(point);
  };

  const gesture = Gesture.Tap()
    .runOnJS(true)  // <- разрешает выполнение JS внутри жеста
    .onEnd(async ({ x, y }) => {
      console.log('tap', x, y);
      await focus({ x, y }); // теперь можно вызывать напрямую
    });

  if(!hasPermission) {
    return (
      <MainLayout>
        <StyledButton onPress={requestPermission}>
          <StyledText>Дайте доступ к камере</StyledText>
        </StyledButton>
      </MainLayout>
    )
  }

  if (device == null) {
    return (
      <MainLayout>
        <StyledText>Камера не найдена</StyledText>
      </MainLayout>
    )
  }

  return (
    <GestureDetector gesture={gesture}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    </GestureDetector>
  );

}

export default ScanScreen;