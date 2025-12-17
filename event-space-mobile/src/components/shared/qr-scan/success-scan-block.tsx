import { View } from 'react-native';
import { CircleCheck } from 'lucide-react-native';
import { StyledButton, StyledText } from '@/src/components/ui';
import { QrEventInfo } from '@/src/components/shared/qr-scan/qr-event-info';
import { useNavigation } from 'expo-router';
import { CommonActions } from '@react-navigation/native';

export const SuccessScanBlock = () => {
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
    <>
      <View className={'items-center gap-4'}>
        <CircleCheck color={'#00c950'} width={130} height={130} />
        <View className={'items-center gap-2'}>
          <StyledText className={'text-3xl font-bold'}>
            билет действителен
          </StyledText>
          <StyledText className={'text-center text-base text-muted-foreground'}>
            Посещение участника успешно подтверждено
          </StyledText>
        </View>
      </View>
      <QrEventInfo />
      <StyledButton className={'w-full h-[50px] mt-3'} onPress={handleReturnHome}>
        <StyledText className={'text-center'}>Вернуться на главную</StyledText>
      </StyledButton>
    </>
  );
}