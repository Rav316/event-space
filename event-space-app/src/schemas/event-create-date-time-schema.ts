import { z } from 'zod';

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Введите дату в правильном формате');

export const eventCreateDateTimeSchema = z
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
    const todayStr = today.toISOString().slice(0, 10); // "YYYY-MM-DD"
    const nowMinutes = today.getHours() * 60 + today.getMinutes();

    if (data.eventDate < todayStr) {
      ctx.addIssue({
        code: 'custom',
        message: 'Дата начала не может быть раньше сегодняшней',
        path: ['eventDate'],
      });
    }

    if (data.deadline < todayStr) {
      ctx.addIssue({
        code: 'custom',
        message: 'Дедлайн не может быть раньше текущей даты',
        path: ['deadline'],
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

    if (data.eventDate === todayStr && startMinutes <= nowMinutes) {
      ctx.addIssue({
        code: 'custom',
        message: 'Время начала должно быть позже текущего времени',
        path: ['startTime'],
      });
    }
  });

export type EventDateTime = z.infer<typeof eventCreateDateTimeSchema>;
