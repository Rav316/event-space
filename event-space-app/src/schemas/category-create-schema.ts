import { z } from 'zod';

export const categoryCreateSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Название должно содержать не менее 3 символов' })
    .max(32, { message: 'Название должно содержать не более 32 символов' }),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, { message: 'Некорректный HEX-цвет' }),
});
