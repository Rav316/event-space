import { Button, Spinner } from '@/components/ui';
import { Lock } from 'lucide-react';
import { useMe } from '@/api/auth/hooks.ts';
import { useAuthModalStore } from '@/store/use-auth-modal-store.ts';
import React from 'react';
import {
  useRegisterForEvent,
  useUnregisterFromEvent,
} from '@/api/events/hooks.ts';

interface Props {
  eventId: number;
  isUserRegistered?: boolean;
  canRegister: boolean;
  canUnregister: boolean;
  isDestructive?: boolean;
  participantsQuantity: number;
  capacity: number;
}

export const EventRegistrationButton: React.FC<Props> = ({
  eventId,
  isUserRegistered,
  canRegister,
  canUnregister,
  isDestructive,
  participantsQuantity,
  capacity,
}) => {
  const hasPlaces = participantsQuantity < capacity;

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
      unregisterFromEventMutation.mutate();
    } else {
      registerForEventMutation.mutate();
    }
  };

  const isButtonEnabled = isUserRegistered
    ? canUnregister
    : canRegister && hasPlaces;

  if(eventId === 10) {
    console.log('isButtonEnabled', isButtonEnabled);
    console.log('isUserRegistered', isUserRegistered);
    console.log('hasPlaces', hasPlaces);
    console.log('canRegister', canRegister);
    console.log('canUnregister', canUnregister);
  }

  return (
    <Button
      disabled={!isButtonEnabled}
      onClick={handleRegistrationClick}
      variant={
        isUserRegistered
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
  );
};
