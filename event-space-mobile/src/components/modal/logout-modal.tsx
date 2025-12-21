
import { StyledButton, StyledText } from '@/src/components/ui';
import React from 'react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/src/components/ui/alert-dialog';

interface Props {
  logout: () => void;
}

export const LogoutModal: React.FC<Props> = ({ logout }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <StyledButton variant={'destructive'}>
          <StyledText>Выйти</StyledText>
        </StyledButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы действительно хотите выйти из аккаунта?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className={'flex-row justify-end'}>
          <AlertDialogCancel>
            <StyledText>Отмена</StyledText>
          </AlertDialogCancel>
          <AlertDialogAction onPress={logout}>
            <StyledText>Выйти</StyledText>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
