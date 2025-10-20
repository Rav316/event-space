import { z } from 'zod';

export const accountDeleteSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Введите пароль' }),
  confirmationPhrase: z
    .string()
    .refine((val) => val === 'удалить мой аккаунт', {
      message: 'Неверная фраза подтверждения',
    }),
});
