import {
  Badge,
  Button,
  Checkbox,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { ChevronDown, Funnel } from 'lucide-react';

const categories: { text: string; count: number }[] = [
  {
    text: 'IT-секции',
    count: 3,
  },
  {
    text: 'Культурные',
    count: 2,
  },
  {
    text: 'Учебные',
    count: 3,
  },
  {
    text: 'Спортивные',
    count: 2,
  },
  {
    text: 'Социальные',
    count: 1,
  },
];

export const CategoriesFilter = () => {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button variant={'outline'} className={'max-[563px]:flex-1'}>
          <Funnel />
          <span>Категории</span>
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={'start'} >
        <div className={'flex flex-col gap-y-5 2xl:gap-y-2 lg:gap-y-4'}>
          <h4 className={'font-medium'}>Выберите категории</h4>
          {categories.map((category, index) => (
            <div key={index} className={'flex items-center justify-between'}>
              <div className={'flex justify-between items-center gap-2 w-full'}>
                <div className={'flex items-center gap-2'}>
                  <Checkbox id={category.text} />
                  <Label htmlFor={category.text}>{category.text}</Label>
                </div>
                <Badge variant={'outline'} className={'text-xs'}>
                  {category.count}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
