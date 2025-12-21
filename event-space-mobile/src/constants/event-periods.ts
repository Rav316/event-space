export const eventPeriods = [
  { label: 'Все', value: 'all' },
  { label: 'Прошедшие', value: 'past' },
  { label: 'Будущие', value: 'future' }
];

export type EventPeriod = (typeof eventPeriods)[number]['value'];
