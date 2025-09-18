import { z } from 'zod';

export const passwordCreateSchema = z.object({
  password: z
    .string()
    .min(4, { message: 'Пароль должен содержать не менее 4 символов' })
    .regex(/^[a-zA-Z0-9@#$%^&+=]*$/, {
      message:
        'Пароль должен содержать только буквы латинского алфавита, цифры и специальные символы',
    }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Пароли не совпадают',
});

export type PasswordCreateData = z.infer<typeof passwordCreateSchema>;