import type { EventStepCreateDto } from '@/api/events/model.ts';

const timeToMinutes = (time: string): number => {
  const [h, m] = time.slice(0, 5).split(':').map(Number);
  return h * 60 + m;
};

const minutesToTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

export const recalculateStepTimes = (
  steps: EventStepCreateDto[],
  eventStartTime: string,
): EventStepCreateDto[] => {
  let currentStart = timeToMinutes(eventStartTime);

  return steps.map((step) => {
    const duration = timeToMinutes(step.endTime) - timeToMinutes(step.startTime);
    const newStart = currentStart;
    const newEnd = currentStart + duration;
    currentStart = newEnd;

    return {
      ...step,
      startTime: minutesToTime(newStart),
      endTime: minutesToTime(newEnd),
    };
  });
};
