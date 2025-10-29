import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { StarRating } from '@/components/shared';
import { RatingDistributionBlock } from '@/components/shared/event-statistics/rating-distribution-block.tsx';
import { Divide } from 'lucide-react';
import { TopWordsBlock } from '@/components/shared/event-statistics/top-words-block.tsx';
import type { ReviewWord } from '@/types/review-word.ts';
import { LastReviewsList } from '@/components/shared/event-statistics/last-reviews-list.tsx';

const words: ReviewWord[] = [
  { text: 'профессионально', count: 12 },
  { text: 'интересно', count: 10 },
  { text: 'полезно', count: 9 },
  { text: 'практика', count: 8 },
  { text: 'организация', count: 7 },
  { text: 'актуально', count: 6 },
];

export const MyReviewsTab = () => {
  return (
    <div className={'flex flex-col gap-5 w-full'}>
      <div className={'flex items-center gap-5 w-full'}>
        <Card className={'w-full h-full'}>
          <CardHeader>
            <CardTitle className={'flex items-center gap-2'}>
              <Divide />
              Моя средняя оценка
            </CardTitle>
          </CardHeader>
          <CardContent className={'h-full flex items-center justify-center'}>
            <div className="flex flex-col gap-2 w-fit items-center">
              <h3 className="font-medium text-4xl">4.7</h3>
              <StarRating rating={4.7} className={'gap-2'} />
              <span className={'text-muted-foreground'}>из 32 отзывов</span>
            </div>
          </CardContent>
        </Card>
        <RatingDistributionBlock />
        <TopWordsBlock words={words} />
      </div>
      <LastReviewsList/>
    </div>
  );
};
