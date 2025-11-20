import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.email({ message: 'Введите корректный email' }),
  password: z.string().min(1, { message: 'Введите пароль' })
});
