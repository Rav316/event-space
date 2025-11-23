import { MainLayout } from '@/src/hoc';
import { StyledButton, StyledText } from '@/src/components/ui';
import { removeTokens } from '@/src/storage/auth-helper';

const SettingsTab = () => {
  const logout = () => {
    removeTokens();
  }

  return (
    <MainLayout>
      <StyledText>Настройки</StyledText>
      <StyledButton onPress={logout}>
        <StyledText>Выйти</StyledText>
      </StyledButton>
    </MainLayout>
  )
}

export default SettingsTab;