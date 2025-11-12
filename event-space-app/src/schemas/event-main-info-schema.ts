import { z } from 'zod';

export const eventMainInfoSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Название должно содержать не менее 5 символов' })
    .max(128, { message: 'Название должно содержать не более 128 символов' }),
  shortDescription: z
    .string()
    .min(20, {
      message: 'Краткое описание должно содержать не менее 20 символов',
    })
    .max(130, {
      message: 'Краткое описание должно содержать не более 130 символов',
    }),
  description: z.string().max(1000, {
    message: 'Описание должно содержать не более 500 символов',
  }),
  tags: z
    .array(z.string())
    .max(5, { message: 'Выберите не более 5 тегов' })
    .optional(),
  category: z.number().min(1, { message: 'Выберите категорию' }),
  participantQuantity: z.number().min(1, { message: 'Выберите количество участников' }),
});

export type EventMainInfo = z.infer<typeof eventMainInfoSchema>;
