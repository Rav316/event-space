import { EventCategory } from '@/components/shared/event-category.tsx';

const categories: {
  text: string;
  color: string;
  count: number;
  isResult?: boolean;
}[] = [
  {
    text: 'IT-секции',
    color: 'orange',
    count: 3,
  },
  {
    text: 'Культурные',
    color: 'purple',
    count: 2,
  },
  {
    text: 'Учебные',
    color: 'blue',
    count: 3,
  },
  {
    text: 'Спортивные',
    color: 'green',
    count: 2,
  },
  {
    text: 'Социальные',
    color: 'pink',
    count: 2,
  },
  {
    text: 'Всего',
    count: 12,
    color: 'gray',
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
