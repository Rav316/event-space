import {
  CameraOverlay,
  RegionOfInterest
} from '@/src/components/shared/qr-scan';
import { StyledButton, StyledText } from '@/src/components/ui';
import { MainLayout } from '@/src/hoc';
import { useFocusEffect } from '@react-navigation/native';
import * as Burnt from 'burnt';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  Camera,
  Point,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner
} from 'react-native-vision-camera';
import RNQRGenerator from 'rn-qr-generator';

const ScanScreen = () => {
  const camera = useRef<Camera>(null);
  const [torch, setTorch] = useState(false);
  const hasScannedRef = useRef(false);
  const [regionOfInterest, setRegionOfInterest] =
    useState<RegionOfInterest | null>(null);
  const [loading, setLoading] = useState(false);

  const { hasPermission, requestPermission } = useCameraPermission();
  const router = useRouter();
  const navigate = useNavigation();

  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (hasScannedRef.current) return;
      hasScannedRef.current = true;

      const isSuccess = codes.length > 0;

      if (isSuccess) {
        Burnt.toast({
          title: 'QR-код успешно отсканирован',
          preset: 'done'
        });
        router.navigate('/qr-scan/success');
      } else {
        Burnt.toast({
          title: 'Ошибка при сканировании',
          preset: 'error'
        });
        router.navigate('/qr-scan/fail');
      }
      console.log(codes);
    },
    regionOfInterest: regionOfInterest ?? undefined
  });

  useFocusEffect(
    useCallback(() => {
      hasScannedRef.current = false;
    }, [])
  );

  const focus = async (point: Point) => {
    const c = camera.current;
    if (!c) return;
    await c.focus(point);
  };

  const gesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(async ({ x, y }) => {
      await focus({ x, y });
    });

  const onOpenGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      selectionLimit: 1,
      quality: 1
    });

    if (result.canceled) return;

    if (result.assets && result.assets.length > 0) {
      const photo = result.assets[0];
      setLoading(true);
      await detectQrCode(photo.uri);
      setLoading(false);
    }
  };

  const detectQrCode = async (uri: string) => {
    Burnt.toast({
      title: 'Обработка изображения...',
      preset: 'none',
      duration: 2,
    });

    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const response = await RNQRGenerator.detect({ uri });
      const { values } = response;

      if (values && values.length > 0) {
        Burnt.toast({
          title: 'QR-код найден!',
          preset: 'done'
        });
        router.navigate('/qr-scan/success');
      } else {
        Burnt.toast({
          title: 'QR-код не найден',
          message: 'Попробуйте другое фото',
          preset: 'error'
        });
      }
    } catch (error) {
      console.log('Cannot detect QR code', error);
      Burnt.toast({
        title: 'Ошибка обработки',
        preset: 'error'
      });
    }
  };

  const handleRegionChange = useCallback((region: RegionOfInterest) => {
    setRegionOfInterest(region);
  }, []);

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
            codeScanner={codeScanner}
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
            onRegionChange={handleRegionChange}
          />


          {loading && (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
              }}
            >
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </View>
      </GestureDetector>
    </View>
  );
};

export default ScanScreen;