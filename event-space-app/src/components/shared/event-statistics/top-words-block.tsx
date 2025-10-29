import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { ChartBar } from 'lucide-react';
import React from 'react';
import type { ReviewWord } from '@/types/review-word.ts';

interface Props {
  words: ReviewWord[];
}

export const TopWordsBlock: React.FC<Props> = ({ words }) => {
  return (
    <Card className={'w-full'}>
      <CardHeader>
        <CardTitle className={'flex items-center gap-2'}>
          <ChartBar className={'w-5 h-5'} />
          Распределение моих оценок
        </CardTitle>
      </CardHeader>
      <CardContent className={'w-full'}>
        <div className={'flex flex-col gap-2  w-full'}>
          {words.map((word, index) => (
            <div className={'flex justify-between gap-2'} key={index}>
              <Badge variant={'outline'}>{word.text}</Badge>
              <span className={'text-muted-foreground'}>{word.count}x</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
