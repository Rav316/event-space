import { z } from 'zod';

export const educationDataSchema = z.object({
  program: z
    .number({
      error: (iss) => iss.input === undefined ? 'Выберите направление' : undefined,
    })
    .min(1, { message: 'Выберите направление' }),
  course: z.number().optional(),
});

export type EducationData = z.infer<typeof educationDataSchema>;
