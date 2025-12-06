import { MainLayout } from '@/src/hoc';
import { StyledButton, StyledText } from '@/src/components/ui';
import {
  Camera,
  Point,
  useCameraDevice,
  useCameraPermission
} from 'react-native-vision-camera';
import { StyleSheet, View } from 'react-native';
import { useRef, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { CameraOverlay } from '@/src/components/shared/qr-scan';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'

const ScanScreen = () => {
  const camera = useRef<Camera>(null);
  const [torch, setTorch] = useState(false);

  const { hasPermission, requestPermission } = useCameraPermission();

  const device = useCameraDevice('back');

  const navigate = useNavigation();

  const focus = async (point: Point) => {
    const c = camera.current;
    if (!c) return;
    await c.focus(point);
  };

  const gesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(async ({ x, y }) => {
      console.log('tap', x, y);
      await focus({ x, y });
    });


  const onOpenGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      selectionLimit: 1,
      quality: 1
    });

    if(result.canceled) {
      return;
    }

    if(result.assets && result.assets.length > 0) {
      const photo = result.assets[0];
      console.log('selected photo:', photo.uri);
    }
  }

  if (!hasPermission) {
    return (
      <MainLayout>
        <StyledButton onPress={requestPermission}>
          <StyledText>Дайте доступ к камере</StyledText>
        </StyledButton>
      </MainLayout>
    );
  }

  if (device == null) {
    return (
      <View className={'pt-5 flex-1 justify-center items-center'}>
        <StyledText>Камера не найдена</StyledText>
      </View>
    );
  }

  return (
    <View className={'flex-1'}>
      <GestureDetector gesture={gesture}>
        <View className={'flex-1'}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            enableZoomGesture={true}
            torch={torch ? 'on' : 'off'}
          />
          <CameraOverlay
            isTorchActive={torch}
            onToggleTorch={() => setTorch((prev) => !prev)}
            onBack={() => navigate.goBack()}
            onOpenGallery={onOpenGallery}
          />
        </View>
      </GestureDetector>
    </View>
  );
};

export default ScanScreen;
