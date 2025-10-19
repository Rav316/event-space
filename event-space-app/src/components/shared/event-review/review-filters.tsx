import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { useEventReviewFilterStore } from '@/store/use-event-review-filter-store.ts';
import { reviewRatingValues } from '@/constants/review-rating-values.ts';
import { reviewSortValues } from '@/constants/review-sort-values.ts';

export const ReviewFilters = () => {
  const setFilter = useEventReviewFilterStore((state) => state.setFilter);

  const onRatingChange = (value: string) => {
    const valueNumber = Number(value);
    if (valueNumber) {
      setFilter({ rating: valueNumber });
    } else {
      setFilter({ rating: undefined });
    }
  };

  const onSortChange = (value: string) => {
    setFilter({ sort: value });
  };

  return (
    <div
      className={
        'flex gap-2 justify-between items-center max-[625px]:flex-col max-[625px]:items-start'
      }
    >
      <div
        className={
          'flex items-center gap-2 max-[430px]:w-full max-[370px]:flex-col'
        }
      >
        <Select
          defaultValue={String(reviewRatingValues[0].value)}
          onValueChange={onRatingChange}
        >
          <SelectTrigger className="max-[370px]:w-full min-[370px]:max-[430px]:flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {reviewRatingValues.map((item) => (
              <SelectItem key={item.value} value={String(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue={reviewSortValues[0].value}
          onValueChange={onSortChange}
        >
          <SelectTrigger className="max-[370px]:w-full min-[370px]:max-[430px]:flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {reviewSortValues.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
