import { z } from 'zod';

export const eventStepSchema = z
  .object({
    name: z
      .string()
      .min(5, { message: "Название должно содержать не менее 5 символов" })
      .max(64, { message: "Название должно содержать не более 64 символов" }),
    startTime: z
      .string()
      .regex(/^([01]?\d|2[0-3]):([0-5]\d)$/, {
        message: "Время должно быть в формате HH:mm",
      }),
    endTime: z
      .string()
      .regex(/^([01]?\d|2[0-3]):([0-5]\d)$/, {
        message: "Время должно быть в формате HH:mm",
      }),
    description: z
      .string()
      .max(200, { message: "Описание должно содержать не более 200 символов" })
      .optional(),
  })
  .refine(
    (data) => {
      const [sh, sm] = data.startTime.split(":").map(Number);
      const [eh, em] = data.endTime.split(":").map(Number);
      return sh * 60 + sm < eh * 60 + em;
    },
    {
      message: "Время окончания должно быть позже времени начала",
      path: ["endTime"],
    }
  );