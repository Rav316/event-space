import { toast } from 'sonner';
import { Spinner } from '@/components/ui';

export const showLogoutLoading = () =>
  toast(
    <div className="flex items-center gap-2">
      <Spinner />
      <span>Выход из системы...</span>
    </div>,
    {
      duration: Infinity,
    },
  );

export const showLogoutSuccess = () =>
  toast.success('Вы успешно вышли из системы');

export const showLogoutError = () =>
  toast.error('Произошла ошибка при выходе из системы');
