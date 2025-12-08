import { MainLayout } from '@/src/hoc';
import { CircleX } from 'lucide-react-native';
import { useNavigation } from 'expo-router';
import { CommonActions } from '@react-navigation/native';
import { StyledButton, StyledText } from '@/src/components/ui';
import { View } from 'react-native';

const FailQrPage = () => {
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
      <CircleX color={'#DC2627'} width={130} height={130} />
      <StyledText className={'text-3xl font-bold'}>
        Билет недействителен
      </StyledText>
      <StyledText className={'text-center text-base text-muted-foreground'}>
        QR-код не распознан нашей системой или уже был отсканирован.
      </StyledText>
      <View className={'gap-3 w-full'}>
        <StyledButton onPress={() => navigation.goBack()} className={'w-full h-[50px]'}>
          <StyledText className={'text-base'}>Попробовать ещё раз</StyledText>
        </StyledButton>
        <StyledButton
          className={'w-full h-[50px]'}
          variant={'outline'}
        >
          <StyledText className={'text-base'} onPress={handleReturnHome}>
            Вернуться на главную
          </StyledText>
        </StyledButton>
      </View>
    </MainLayout>
  );
};

export default FailQrPage;
