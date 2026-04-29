import { z } from 'zod';

export const programEditSchema = z.object({
  name: z
    .string()
    .min(5, 'Название должно содержать не менее 5 символов')
    .max(128, 'Название должно содержать не более 128 символов'),
  building: z.number({ error: 'Выберите корпус' }).min(1, 'Выберите корпус'),
});
