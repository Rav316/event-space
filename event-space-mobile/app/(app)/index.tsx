import * as Burnt from 'burnt';
import { MainLayout } from '@/src/hoc';
import { StyledButton, StyledText } from '@/src/components/ui';
import { removeTokens } from '@/src/storage/auth-helper';


const MainPage = () => {
  const logout = () => {
    removeTokens();
    Burnt.toast({
      title: 'Вы успешно вышли из системы',
      preset: 'none'
    })
  };

  return (
    <MainLayout>
      <StyledText>Главная</StyledText>
      <StyledButton onPress={logout}>
        <StyledText>Выйти</StyledText>
      </StyledButton>
    </MainLayout>
  );
};

export default MainPage;
