import { z } from 'zod';

const dateSchema = z.coerce.date({
  error: () => ({ message: 'Некорректная дата' }),
});

export const eventDateTimeSchema = z
  .object({
    eventDate: dateSchema,
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, 'Время должно быть в формате HH:MM'),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, 'Время должно быть в формате HH:MM'),
    deadline: dateSchema,
  })
  .superRefine((data, ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (data.eventDate < today) {
      ctx.addIssue({
        code: 'custom',
        message: 'Дата начала не может быть раньше сегодняшней',
        path: ['eventDate'],
      });
    }

    if (data.deadline > data.eventDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'Дедлайн не может быть позже даты начала мероприятия',
        path: ['deadline'],
      });
    }

    const [startH, startM] = data.startTime.split(':').map(Number);
    const [endH, endM] = data.endTime.split(':').map(Number);

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (startMinutes >= endMinutes) {
      ctx.addIssue({
        code: 'custom',
        message: 'Время начала должно быть раньше времени окончания',
        path: ['startTime'],
      });
    }
  });

export type EventDateTime = z.infer<typeof eventDateTimeSchema>;
