import { z } from 'zod';

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Дата должна быть в формате YYYY-MM-DD');

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

    const eventDate = new Date(data.eventDate);
    const deadline = new Date(data.deadline);

    if (eventDate < today) {
      ctx.addIssue({
        code: 'custom',
        message: 'Дата начала не может быть раньше сегодняшней',
        path: ['eventDate'],
      });
    }

    if (deadline > eventDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'Дедлайн не может быть позже даты начала мероприятия',
        path: ['deadline'],
      });
    }

    const [startH, startM] = data.startTime.split(':').map(Number);
    const [endH, endM] = data.endTime.split(':').map(Number);

    if (startH * 60 + startM >= endH * 60 + endM) {
      ctx.addIssue({
        code: 'custom',
        message: 'Время начала должно быть раньше времени окончания',
        path: ['startTime'],
      });
    }
  });

export type EventDateTime = z.infer<typeof eventDateTimeSchema>;
