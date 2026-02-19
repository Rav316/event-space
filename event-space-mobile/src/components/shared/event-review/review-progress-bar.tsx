import { View } from 'react-native';
import React from 'react';
import { Progress, StyledText } from '@/src/components/ui';
import { Star } from 'lucide-react-native';

interface Props {
  rating: number;
  count: number;
  total: number;
}

export const ReviewProgressBar: React.FC<Props> = ({
  rating,
  count,
  total
}) => {
  const progress = total > 0 ? (count / total) * 100 : 0;

  return (
    <View className={'flex-row items-center w-full gap-4'}>
      <StyledText className={'w-6 text-right'}>{rating}</StyledText>
      <View className={'flex-row items-center flex-1 gap-2'}>
        <Star className={'shrink-0'} fill="#facc15" color="#facc15" width={16} height={16} />
        <Progress
          className={'flex-1 h-2'}
          indicatorClassName={'bg-yellow-400'}
          value={progress}
        />
      </View>

      <StyledText className={'text-muted-foreground text-right'}>
        {count}
      </StyledText>
    </View>
  );
};
