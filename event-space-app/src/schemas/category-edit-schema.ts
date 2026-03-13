import { z } from 'zod';

export const categoryEditSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Название должно содержать не менее 3 символов' })
    .max(32, { message: 'Название должно содержать не более 32 символов' }),
});
