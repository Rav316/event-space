import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { StarRating } from '@/components/shared';
import { RatingDistributionBlock } from '@/components/shared/event-statistics/rating-distribution-block.tsx';
import { Divide } from 'lucide-react';
import { TopWordsBlock } from '@/components/shared/event-statistics/top-words-block.tsx';
import type { ReviewWord } from '@/types/review-word.ts';
import { LastReviewsList } from '@/components/shared/event-statistics/last-reviews-list.tsx';
import { useReviewStatistics } from '@/api/statistics/hooks.ts';
import { ReviewStatisticsSkeleton } from '@/components/shared/event-statistics/review-statistics-skeleton.tsx';

const words: ReviewWord[] = [
  { text: 'профессионально', count: 12 },
  { text: 'интересно', count: 10 },
  { text: 'полезно', count: 9 },
  { text: 'практика', count: 8 },
  { text: 'организация', count: 7 },
  { text: 'актуально', count: 6 },
];

export const MyReviewsTab = () => {
  const { data: statistics, isPending: isStatisticsPending } =
    useReviewStatistics();

  if (isStatisticsPending || !statistics) {
    return <ReviewStatisticsSkeleton />;
  }

  return (
    <div className='flex flex-col gap-5 w-full'>
      <div className='flex items-stretch gap-5 w-full max-[1000px]:flex-col'>
        <div className='flex flex-2 gap-5 max-[625px]:flex-col'>
          <Card className='w-full h-full'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Divide />
                Моя средняя оценка
              </CardTitle>
            </CardHeader>
            <CardContent className='h-full flex items-center justify-center'>
              <div className='flex flex-col gap-2 w-fit items-center'>
                <h3 className='font-medium text-4xl'>{statistics.avgRating.toFixed(2)}</h3>
                <StarRating rating={statistics.avgRating} className='gap-2' />
                <span className='text-muted-foreground'>
                из {statistics.total} отзывов
              </span>
              </div>
            </CardContent>
          </Card>

          <TopWordsBlock words={words} />
        </div>

        <div className='flex-1'>
          <RatingDistributionBlock
            total={statistics.total}
            fiveStars={statistics.fiveStars}
            fourStars={statistics.fourStars}
            threeStars={statistics.threeStars}
            twoStars={statistics.twoStars}
            oneStar={statistics.oneStar}
          />
        </div>
      </div>

      <LastReviewsList />
    </div>
  );

};
