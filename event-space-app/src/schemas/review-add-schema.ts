import { z } from 'zod';

export const reviewAddSchema = z.object({
  rating: z
    .number()
    .min(1, { message: 'Выберите рейтинг' })
    .max(5, { message: 'Выберите рейтинг' }),
  title: z
    .string()
    .min(5, { message: 'Название должно содержать не менее 5 символов' })
    .max(100, { message: 'Название должно содержать не более 100 символов' }),
  content: z
    .string()
    .min(10, { message: 'Отзыв должен содержать не менее 10 символов' })
    .max(1000, { message: 'Отзыв должен содержать не более 1000 символов' }),
});
