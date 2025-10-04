export const eventSortCategories = [
  { label: 'По дате', value: 'date' },
  { label: 'По популярности', value: 'popularity' },
  { label: 'По доступности', value: 'availability' },
  { label: 'По алфавиту', value: 'alphabet' },
];

export type EventSortCategory = typeof eventSortCategories[number]['value'];