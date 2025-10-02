import { EventCategory } from '@/components/shared/event-category.tsx';
import { useEventCategoriesWithEventCount } from '@/api/event-categories/hooks.ts';
import { Skeleton } from '@/components/ui';

export const EventCategories = () => {
  const { data, isPending } = useEventCategoriesWithEventCount();

  return (
    <div
      className={
        'grid grid-cols-6 max-[1000px]:grid-cols-3 max-[460px]:grid-cols-2 gap-2'
      }
    >
      {isPending ? (
        Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className={'w-full h-[134px]'} />
        ))
      ) : (
        <>
          {data?.map((category) => (
            <EventCategory
              key={category.id}
              id={category.id}
              text={category.name}
              count={category.eventCount}
            />
          ))}
          <EventCategory
            id={0}
            text={'Все'}
            count={
              data?.reduce((acc, category) => acc + category.eventCount, 0) || 0
            }
            isResult={true}
          />
        </>
      )}
    </div>
  );
};
