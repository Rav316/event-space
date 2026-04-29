import { z } from 'zod';

export const userProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Имя должно содержать не менее 2 символов' })
    .max(64, { message: 'Имя должно содержать не более 64 символов' }),
  lastName: z
    .string()
    .min(2, { message: 'Фамилия должна содержать не менее 2 символов' })
    .max(64, { message: 'Фамилия должна содержать не более 64 символов' }),
  email: z.email({ message: 'Некорректный email' }),
  phone: z.string().optional(),
  program: z.number().min(1, { message: 'Выберите направление' }),
  course: z.number().optional(),
  description: z.string().optional(),
  tgUsername: z.string().optional(),
  vkUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  notificationCategoryIds: z.array(z.number()).optional(),
  emailNotificationsEnabled: z.boolean().optional(),
});
