import React from 'react';
import { Button, Progress } from '@/components/ui';
import { useMe } from '@/api/auth/hooks.ts';
import { Lock } from 'lucide-react';
import { useAuthModalStore } from '@/store/use-auth-modal-store.ts';
import { cn } from '@/lib/utils.ts';

interface Props {
  registered: number;
  quantity: number;
  className?: string;
}

export const EventRegistrationBlock: React.FC<Props> = ({
  registered,
  quantity,
  className,
}) => {
  const { data } = useMe();

  const setAuthModalOpen = useAuthModalStore((state) => state.setIsOpen);

  const handleRegistrationClick = () => {
    if (!data) {
      setAuthModalOpen(true);
    }
  };

  return (
    <div
      className={cn(
        'border border-[#E5E5E5] rounded-2xl p-5 flex flex-col gap-4',
        className,
      )}
    >
      <span className={'font-medium text-xl'}>Регистрация</span>
      <div className={'flex flex-col gap-1'}>
        <div className={'flex justify-between'}>
          <span>Зарегистрировано</span>
          <span>
            {registered}/{quantity}
          </span>
        </div>
        <Progress value={(registered / quantity) * 100} />
        <span className={'text-muted-foreground text-sm'}>
          {quantity - registered} мест осталось
        </span>
      </div>
      <Button onClick={handleRegistrationClick}>
        {data ? (
          <span>Зарегистрироваться</span>
        ) : (
          <>
            <Lock />
            <span>Войти для регистрации</span>
          </>
        )}
      </Button>
    </div>
  );
};
