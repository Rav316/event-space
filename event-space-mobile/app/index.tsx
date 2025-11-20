import { View } from 'react-native';
import { StyledButton, StyledText } from '@/src/components/ui';
import { useState } from 'react';

export default function Index() {
  const [counter, setCounter] = useState(0);

  return (
    <View className={'flex-1 justify-center items-center gap-5'}>
      <StyledText>Edit app/index.tsx to edit this screen.</StyledText>
      <StyledText>{counter}</StyledText>
      <StyledButton
        onPress={() => setCounter((prev) => prev + 1)}
        variant={'default'}
      >
        <StyledText>click</StyledText>
      </StyledButton>
    </View>
  );
}
