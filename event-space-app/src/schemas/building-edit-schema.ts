import { z } from 'zod';

export const buildingEditSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Название должно содержать не менее 3 символов' }),
  address: z
    .string()
    .min(10, { message: 'Адрес должен содержать не менее 10 символов' }),
});
