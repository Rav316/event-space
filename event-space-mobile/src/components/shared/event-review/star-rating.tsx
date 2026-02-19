import { View } from 'react-native';
import React from 'react';
import { Star } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

interface Props {
  rating: number;
  max?: number;
  starSize?: number;
}

export const StarRating: React.FC<Props> = ({
  rating,
  max = 5,
  starSize = 20
}) => {
  const { colorScheme } = useColorScheme();
  const emptyStrokeColor = colorScheme === 'dark' ? '#ffffff' : '#71717a';

  return (
    <View className={'flex-row gap-1 items-center'}>
      {Array.from({ length: max }).map((_, i) => {
        const fillPercent = Math.min(Math.max(rating - i, 0), 1) * 100;
        return (
          <View
            key={i}
            className={'relative items-center justify-center'}
            style={{ width: starSize, height: starSize }}
          >
            <Star size={starSize} color={emptyStrokeColor} className={'absolute inset-0 stroke-[1.3]'} />
            <View
              className={'absolute inset-0 overflow-hidden'}
              style={{ width: `${fillPercent}%` }}
            >
              <Star
                size={starSize}
                fill="#facc15"
                color="#facc15"
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};
