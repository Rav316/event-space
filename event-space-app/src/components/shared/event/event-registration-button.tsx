import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { Lock } from 'lucide-react';
import { useMe } from '@/api/auth/hooks.ts';
import { useAuthModalStore } from '@/store/use-auth-modal-store.ts';
import {
  useRegisterForEvent,
  useUnregisterFromEvent,
} from '@/api/events/hooks.ts';
import { compareWithToday } from '@/utils/compare-with-current-date.ts';

interface Props {
  eventId: number;
  isUserRegistered?: boolean;
  canRegister: boolean;
  canUnregister: boolean;
  isDestructive?: boolean;
  registeredUsers: number;
  capacity: number;
  deadline?: string;
}

export const EventRegistrationButton: React.FC<Props> = ({
  eventId,
  isUserRegistered,
  canRegister,
  canUnregister,
  isDestructive,
  registeredUsers,
  capacity,
  deadline
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const hasPlaces = registeredUsers < capacity;

  const { data, isFetching } = useMe();
  const setAuthModalOpen = useAuthModalStore((state) => state.setIsOpen);

  const registerForEventMutation = useRegisterForEvent(eventId);
  const unregisterFromEventMutation = useUnregisterFromEvent(eventId);

  const handleRegistrationClick = () => {
    if (!data) {
      setAuthModalOpen(true);
      return;
    }

    if (isUserRegistered) {
      if (!canRegister && canUnregister) {
        setIsDialogOpen(true);
        return;
      }

      unregisterFromEventMutation.mutate();
    } else {
      registerForEventMutation.mutate();
    }
  };

  const handleConfirmUnregister = () => {
    unregisterFromEventMutation.mutate();
    setIsDialogOpen(false);
  };

  const isButtonEnabled = data
    ? isUserRegistered
      ? canUnregister
      : canRegister && hasPlaces && (deadline === undefined || compareWithToday(deadline) > -1)
    : true;

  return (
    <>
      <Button
        disabled={!isButtonEnabled}
        onClick={handleRegistrationClick}
        variant={
          !data
            ? 'default'
            : isUserRegistered
              ? isDestructive
                ? 'destructive'
                : 'outline'
              : 'default'
        }
      >
        {isFetching ||
        registerForEventMutation.isPending ||
        unregisterFromEventMutation.isPending ? (
          <>
            <Spinner />
            <span>Загрузка...</span>
          </>
        ) : (
          <>
            {data ? (
              <>
                {isUserRegistered ? (
                  <span>Отменить регистрацию</span>
                ) : (
                  <span>Зарегистрироваться</span>
                )}
              </>
            ) : (
              <>
                <Lock />
                <span>Войти для регистрации</span>
              </>
            )}
          </>
        )}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтвердите отмену</DialogTitle>
          </DialogHeader>
          <p>
            Вы уверены, что хотите отменить регистрацию? Мероприятие уже
            началось, зарегистрироваться на него больше не получится.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleConfirmUnregister}>
              Подтвердить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
