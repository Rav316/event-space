import { z } from 'zod';
import { Api } from '@/api/api-client.ts';

export const personalInfoSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: 'Имя должно содержать не менее 2 символов' }),
    lastName: z
      .string()
      .min(2, { message: 'Фамилия должна содержать не менее 2 символов' }),
    email: z.email({ message: 'Некорректный email' }),
  })
  .refine(
    async (email) => {
      const exists = await Api.users.existsByEmail(email.email);
      return !exists;
    },
    {
      message: 'Пользователь с таким email уже зарегистрирован',
      path: ['email'],
    },
  );

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
