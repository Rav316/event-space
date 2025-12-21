import { toast } from 'sonner';

export const showLogoutSuccess = () =>
  toast.success('Вы успешно вышли из системы');

export const showLogoutError = () =>
  toast.error('Произошла ошибка при выходе из системы');
