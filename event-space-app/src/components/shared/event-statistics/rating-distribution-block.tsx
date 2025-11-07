import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { RatingDistributionItem } from '@/components/shared/event-statistics/rating-distribution-item.tsx';
import { ChartBar } from 'lucide-react';
import React from 'react';

interface Props {
  total: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
}

export const RatingDistributionBlock: React.FC<Props> = ({
  total,
  fiveStars,
  fourStars,
  threeStars,
  twoStars,
  oneStar,
}) => {
  return (
    <Card className={'w-full h-full'}>
      <CardHeader>
        <CardTitle className={'flex items-center gap-2'}>
          <ChartBar className={'w-5 h-5'} />
          Распределение моих оценок
        </CardTitle>
      </CardHeader>
      <CardContent className={'w-full h-full flex items-center'}>
        <div className={'flex flex-col justify-center gap-2  w-full'}>
          <RatingDistributionItem rating={5} value={fiveStars} total={total} />
          <RatingDistributionItem rating={4} value={fourStars} total={total} />
          <RatingDistributionItem rating={3} value={threeStars} total={total} />
          <RatingDistributionItem rating={2} value={twoStars} total={total} />
          <RatingDistributionItem rating={1} value={oneStar} total={total} />
        </div>
      </CardContent>
    </Card>
  );
};
