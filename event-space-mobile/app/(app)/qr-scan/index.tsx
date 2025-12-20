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
import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  View
} from 'react-native';
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
      if (loading || hasScannedRef.current) return;
      hasScannedRef.current = true;
      router.navigate({
        pathname: '/qr-scan/result',
        params: { token: codes[0].value }
      });
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
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Burnt.toast({
        title: 'Доступ к галерее запрещен',
        preset: 'error'
      });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: false,
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
    await new Promise((resolve) => setTimeout(resolve, 800));
    try {
      const response = await RNQRGenerator.detect({ uri });
      const { values } = response;
      if (values && values.length > 0) {
        router.navigate({
          pathname: '/qr-scan/result',
          params: { token: values[0] }
        });
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

  const handleRequestCameraPermission = async () => {
    const result = await requestPermission();
    if (!result) {
      Alert.alert(
        'Необходим доступ к камере',
        'Чтобы сканировать QR-коды, разрешите доступ к камере в настройках вашего устройства.',
        [
          { text: 'Отмена', style: 'cancel' },
          {
            text: 'Открыть настройки',
            onPress: () => Linking.openSettings()
          }
        ]
      );
    }
  };

  if (!hasPermission) {
    return (
      <MainLayout>
        <View className={'pt-5 flex-1 justify-center items-center gap-6'}>
          <StyledText className="text-center px-4">
            Для работы сканера необходим доступ к камере
          </StyledText>
          <View className={'gap-2'}>
            <StyledButton onPress={handleRequestCameraPermission}>
              <StyledText>Разрешить доступ</StyledText>
            </StyledButton>
            <StyledButton onPress={onOpenGallery}>
              <StyledText>Сканировать из галереи</StyledText>
            </StyledButton>
          </View>
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
      </MainLayout>
    );
  }

  if (device == null) {
    return (
      <MainLayout>
        <View className={'pt-5 flex-1 justify-center items-center'}>
          <StyledText>Камера не найдена</StyledText>
          <StyledButton onPress={onOpenGallery} style={{ marginTop: 20 }}>
            <StyledText>Сканировать из галереи</StyledText>
          </StyledButton>
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
      </MainLayout>
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
            isActive={!loading}
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
