import { z } from 'zod';

export const complaintCreateSchema = z.object({
  complaintType: z
    .number()
    .optional()
    .refine((v): v is number => v !== undefined, {
      message: 'Выберите причину жалобы',
    }),
  description: z.string().min(1, 'Описание не может быть пустым').max(500),
});
