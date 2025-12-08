import { QrEventInfo } from '@/src/components/shared/qr-scan';
import { StyledButton, StyledText } from '@/src/components/ui';
import { MainLayout } from '@/src/hoc';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { CircleCheck } from 'lucide-react-native';
import { View } from 'react-native';

const SuccessQrPage = () => {
  const navigation = useNavigation();

  const handleReturnHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: '(tabs)',
            state: {
              index: 0,
              routes: [{ name: 'main' }]
            }
          }
        ]
      })
    );
  };


  return (
    <MainLayout className={'items-center justify-center gap-6'}>
      <View className={'items-center gap-2'}>
        <CircleCheck color={'#00c950'} width={130} height={130} />
        <View className={'items-center'}>
          <StyledText className={'text-3xl font-bold'}>
            билет действителен
          </StyledText>
          <StyledText className={'text-center text-base text-muted-foreground'}>
            Посещение участника успешно подтверждено
          </StyledText>
        </View>
      </View>
      <QrEventInfo />
      <StyledButton
        className={'w-full h-[50px]'}
        onPress={handleReturnHome}
      >
        <StyledText className={'text-center'}>Вернуться на главную</StyledText>
      </StyledButton>
    </MainLayout>
  );
};

export default SuccessQrPage;
