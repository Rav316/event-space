import { z } from 'zod';

export const spaceCreateSchema = z.object({
  name: z
    .string()
    .min(3, 'Название должно содержать не менее 3 символов')
    .max(64, 'Название должно содержать не более 64 символов'),
  building: z.number({ error: 'Выберите локацию' }).min(1, 'Выберите локацию'),
  type: z
    .number({ error: 'Выберите тип пространства' })
    .min(1, 'Выберите тип пространства'),
  floor: z.number().int().min(-1, 'Этаж не может быть меньше -1').optional(),
  capacity: z
    .number({ error: 'Укажите вместимость' })
    .min(1, 'Вместимость должна быть не менее 1'),
});

export type SpaceCreateFormData = z.infer<typeof spaceCreateSchema>;
