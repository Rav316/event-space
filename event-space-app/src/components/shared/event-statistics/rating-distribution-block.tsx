import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { RatingDistributionItem } from '@/components/shared/event-statistics/rating-distribution-item.tsx';
import { ChartBar } from 'lucide-react';

export const RatingDistributionBlock = () => {
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
          <RatingDistributionItem rating={5} value={18} total={32} />
          <RatingDistributionItem rating={4} value={10} total={32} />
          <RatingDistributionItem rating={3} value={4} total={32} />
          <RatingDistributionItem rating={2} value={0} total={32} />
          <RatingDistributionItem rating={1} value={0} total={32} />
        </div>
      </CardContent>
    </Card>
  );
};
