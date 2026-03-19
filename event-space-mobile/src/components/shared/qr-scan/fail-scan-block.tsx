import { CircleX } from 'lucide-react-native';
import { StyledButton, StyledText } from '@/src/components/ui';
import { View } from 'react-native';
import { useNavigation } from 'expo-router';
import { CommonActions } from '@react-navigation/native';
import React from 'react';

interface Props {
  title: string;
  errorMessage: string;
}

export const FailScanBlock: React.FC<Props> = ({ title, errorMessage }) => {
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
    <View className={'w-full items-center gap-5'}>
      <CircleX color={'#DC2627'} width={130} height={130} />
      <StyledText className={'text-3xl font-bold'}>
        {title}
      </StyledText>
      <StyledText className={'text-center text-base text-muted-foreground'}>
        {errorMessage}
      </StyledText>
      <View className={'gap-3 w-full'}>
        <StyledButton
          onPress={() => navigation.goBack()}
          className={'w-full h-[50px]'}
        >
          <StyledText className={'text-base'}>Попробовать ещё раз</StyledText>
        </StyledButton>
        <StyledButton
          className={'w-full h-[50px]'}
          variant={'outline'}
          onPress={handleReturnHome}
        >
          <StyledText className={'text-base'}>Вернуться на главную</StyledText>
        </StyledButton>
      </View>
    </View>
  );
};
