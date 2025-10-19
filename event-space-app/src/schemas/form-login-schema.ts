import { z } from 'zod';

export const formLoginSchema = z.object({
  email: z.email({ message: 'Некорректный email' }),
  password: z
    .string()
    .min(4, { message: 'Пароль должен содержать не менее 4 символов' }),
});

export type LoginData = z.infer<typeof formLoginSchema>;
