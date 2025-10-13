import { z } from 'zod';

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, { message: 'Пароль должен содержать не менее 8 символов' })
      .regex(/^(?=.*\d)(?=.*[a-zA-Z]).+$/, {
        message:
          'Пароль должен содержать хотя бы одну цифру и букву латинского алфавита',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });
