import { MainLayout } from '@/src/hoc';
import { useConfirmAttendance } from '@/src/api/events/hooks';
import { View } from 'react-native';
import { StyledText } from '@/src/components/ui';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { useCallback, useRef } from 'react';

type RootStackParamList = {
  ScanResult: {
    token: string;
  };
};

const ScanResultPage = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ScanResult'>>();
  const { token } = route.params;

  const confirmAttendanceMutation = useConfirmAttendance();

  const calledRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (calledRef.current) return;

      calledRef.current = true;
      confirmAttendanceMutation.mutate(token);
    }, [confirmAttendanceMutation, token])
  );

  return (
    <MainLayout>
      <View className="items-center gap-2">
        <StyledText>Результат сканирования</StyledText>

        {confirmAttendanceMutation.isPending && (
          <StyledText>Обработка...</StyledText>
        )}

        {confirmAttendanceMutation.isSuccess && (
          <StyledText>Успешно</StyledText>
        )}

        {confirmAttendanceMutation.isError && <StyledText>Ошибка</StyledText>}
      </View>
    </MainLayout>
  );
};

export default ScanResultPage;
