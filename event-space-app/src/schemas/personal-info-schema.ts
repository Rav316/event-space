import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2 символов' }),
  lastName: z.string().min(2, { message: 'Фамилия должна содержать не менее 2 символов' }),
  email: z.email({ message: 'Некорректный email' }),
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;