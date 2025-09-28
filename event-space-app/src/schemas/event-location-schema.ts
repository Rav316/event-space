import { z } from 'zod';

export const eventLocationSchema = z.object({
  space: z.number().min(1, { message: 'Выберите место проведения' }),
});

export type EventLocationData = z.infer<typeof eventLocationSchema>;