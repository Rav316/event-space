import { z } from 'zod';
import { Roles } from '@/api/auth/model.ts';

export const roleStatusSchema = z.object({
  role: z
    .enum(Roles, {
      error: () => ({
        message: 'Выберите роль',
      }),
    })
    .refine((value) => value !== Roles.ADMIN, {
      message: 'Выберите роль',
    }),
  program: z.number().min(1, { message: 'Выберите направление' }),
  course: z.number().optional(),
});

export type RoleStatusData = z.infer<typeof roleStatusSchema>;
