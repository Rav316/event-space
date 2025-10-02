import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export const showLogoutLoading = () =>
  toast(
    <div className='flex items-center gap-2'>
      <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
      <span>Выход из системы...</span>
    </div>,
    {
      duration: Infinity,
    },
  )

export const showLogoutSuccess = () =>
  toast.success('Вы успешно вышли из системы')

export const showLogoutError = () =>
  toast.error('Произошла ошибка при выходе из системы')