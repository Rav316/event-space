import {
  Badge,
  Button,
  Checkbox,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger, Skeleton
} from '@/components/ui';
import { ChevronDown, Funnel } from 'lucide-react';
import { useEventCategoriesWithEventCount } from '@/api/event-categories/hooks.ts';

export const CategoriesFilter = () => {
  const { data, isPending } = useEventCategoriesWithEventCount();

  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button variant={'outline'} className={'max-[563px]:flex-1'}>
          <Funnel />
          <span>Категории</span>
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={'start'}>
        <div className={'flex flex-col gap-y-5 2xl:gap-y-2 lg:gap-y-4'}>
          <h4 className={'font-medium'}>Выберите категории</h4>
          {isPending ? (
            <>
              {Array.from({length: 5}).map((_, index) => ((
                <Skeleton key={index} className={'w-full h-[22px]'}/>
              )))}
            </>
          ) : (
            <>
              {data?.map((category) => (
                <div
                  key={category.id}
                  className={'flex items-center justify-between'}
                >
                  <div
                    className={'flex justify-between items-center gap-2 w-full'}
                  >
                    <div className={'flex items-center gap-2'}>
                      <Checkbox id={category.name} />
                      <Label htmlFor={category.name}>{category.name}</Label>
                    </div>
                    <Badge variant={'outline'} className={'text-xs'}>
                      {category.eventCount}
                    </Badge>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
