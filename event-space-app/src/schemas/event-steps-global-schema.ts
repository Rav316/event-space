import { z } from 'zod';

export const eventStepsGlobalSchema = z
  .object({
    steps: z.array(
      z.object({
        name: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        description: z.string().optional(),
      }),
    ),
    eventStartTime: z.string(),
    eventEndTime: z.string(),
  })
  .superRefine((data, ctx) => {
    const { steps, eventStartTime, eventEndTime } = data;

    if (steps.length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Должен быть хотя бы один шаг',
        path: ['steps'],
      });
      return;
    }

    const [gsH, gsM] = eventStartTime.split(':').map(Number);
    const [geH, geM] = eventEndTime.split(':').map(Number);
    const globalStartMinutes = gsH * 60 + gsM;
    const globalEndMinutes = geH * 60 + geM;

    const [firstH, firstM] = steps[0].startTime.split(':').map(Number);
    const firstMinutes = firstH * 60 + firstM;
    if (firstMinutes < globalStartMinutes) {
      ctx.addIssue({
        code: 'custom',
        message: 'Первый шаг начинается раньше начала мероприятия',
        path: ['steps', 0, 'startTime'],
      });
    }

    for (let i = 1; i < steps.length; i++) {
      const [prevEndH, prevEndM] = steps[i - 1].endTime.split(':').map(Number);
      const prevEndMinutes = prevEndH * 60 + prevEndM;

      const [currStartH, currStartM] = steps[i].startTime
        .split(':')
        .map(Number);
      const currStartMinutes = currStartH * 60 + currStartM;

      if (prevEndMinutes !== currStartMinutes) {
        ctx.addIssue({
          code: 'custom',
          message: `Шаг ${i + 1} должен начинаться сразу после окончания шага ${i}`,
          path: ['steps', i, 'startTime'],
        });
      }
    }

    const [lastEndH, lastEndM] = steps[steps.length - 1].endTime
      .split(':')
      .map(Number);
    const lastEndMinutes = lastEndH * 60 + lastEndM;
    if (lastEndMinutes !== globalEndMinutes) {
      ctx.addIssue({
        code: 'custom',
        message:
          'Последний шаг должен заканчиваться ровно во время окончания мероприятия',
        path: ['steps', steps.length - 1, 'endTime'],
      });
    }
  });
