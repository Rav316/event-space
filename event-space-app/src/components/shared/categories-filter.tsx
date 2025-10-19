import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from '@/components/ui';
import { ChevronDown, Funnel } from 'lucide-react';
import { useEventCategoriesWithEventCount } from '@/api/event-categories/hooks.ts';
import { CategoryCheckbox } from '@/components/shared';

export const CategoriesFilter = () => {
  const { data, isPending } = useEventCategoriesWithEventCount();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={'max-[703px]:flex-1'}>
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
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className={'w-full h-[22px]'} />
              ))}
            </>
          ) : (
            <>
              {data?.map((category) => (
                <CategoryCheckbox
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  count={category.eventCount}
                />
              ))}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
