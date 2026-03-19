import { MainLayout } from '@/src/hoc';
import { useConfirmAttendance } from '@/src/api/events/hooks';
import { View } from 'react-native';
import { StyledText } from '@/src/components/ui';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import { RootStackParamList } from '@/src/types/routes';
import {
  FailScanBlock,
  SuccessScanBlock
} from '@/src/components/shared/qr-scan';
import { getQrErrorMessage, getQrErrorTitle } from '@/src/utils/get-qr-error-message';

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
    <MainLayout className={'justify-center'}>
      <StyledText className={'mt-3 text-center text-base font-bold'}>
        Результат сканирования
      </StyledText>
      <View className="flex-1  justify-center items-center gap-2">
        {confirmAttendanceMutation.isPending && (
          <StyledText>Обработка...</StyledText>
        )}

        {confirmAttendanceMutation.isSuccess && (
          <SuccessScanBlock eventInfo={confirmAttendanceMutation.data} />
        )}

        {confirmAttendanceMutation.isError && (
          <FailScanBlock
            title={getQrErrorTitle(confirmAttendanceMutation.error)}
            errorMessage={getQrErrorMessage(confirmAttendanceMutation.error)}
          />
        )}
      </View>
    </MainLayout>
  );
};

export default ScanResultPage;
