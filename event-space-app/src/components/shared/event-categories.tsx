import { EventCategory } from '@/components/shared/event-category.tsx';

const categories: {
  text: string;
  color: number;
  count: number;
  isResult?: boolean;
}[] = [
  {
    text: 'IT-секции',
    color: 0,
    count: 3,
  },
  {
    text: 'Культурные',
    color: 1,
    count: 2,
  },
  {
    text: 'Учебные',
    color: 2,
    count: 3,
  },
  {
    text: 'Спортивные',
    color: 3,
    count: 2,
  },
  {
    text: 'Социальные',
    color: 4,
    count: 2,
  },
  {
    text: 'Всего',
    count: 12,
    color: 5,
    isResult: true,
  },
];

export const EventCategories = () => {
  return (
    <div
      className={
        'grid grid-cols-6 max-[1000px]:grid-cols-3 max-[460px]:grid-cols-2 gap-2'
      }
    >
      {categories.map((category, index) => (
        <EventCategory
          key={index}
          text={category.text}
          count={category.count}
          color={category.color}
          isResult={category.isResult}
        />
      ))}
    </div>
  );
};
