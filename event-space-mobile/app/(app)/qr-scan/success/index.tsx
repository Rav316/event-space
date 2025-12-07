import { MainLayout } from '@/src/hoc';
import { CircleCheck } from 'lucide-react-native';
import { StyledButton, StyledText } from '@/src/components/ui';
import { QrEventInfo } from '@/src/components/shared/qr-scan';
import { View } from 'react-native';

const SuccessQrPage = () => {
  return (
    <MainLayout className={'items-center justify-center gap-6'}>
      <View className={'items-center gap-2'}>
        <CircleCheck color={'#00c950'} width={130} height={130} />
        <View className={'items-center '}>
          <StyledText className={'text-3xl font-bold'}>
            билет действителен
          </StyledText>
          <StyledText className={'text-center text-base text-muted-foreground'}>
            Посещение участника успешно подтверждено
          </StyledText>
        </View>
      </View>
      <QrEventInfo/>
      <StyledButton className={'w-full h-[50px]'}>
        <StyledText className={'text-center'}>Вернуться на главную</StyledText>
      </StyledButton>
    </MainLayout>
  );
};

export default SuccessQrPage;
