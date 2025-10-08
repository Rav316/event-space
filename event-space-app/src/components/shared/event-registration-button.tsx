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
  isDestructive?: boolean;
}

export const EventRegistrationButton: React.FC<Props> = ({
  eventId,
  isUserRegistered,
  isDestructive
}) => {
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

  return (
    <Button
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
