import React from 'react';
import { View } from 'react-native';
import { Checkbox, Label, StyledText } from '@/src/components/ui';
import { Badge } from '@/src/components/ui/badge';

interface Props {
  id: number;
  name: string;
  count: number;
}

export const CategoryCheckbox: React.FC<Props> = ({id, name, count}) => {
  return (
    <View className={'flex-row items-center justify-center'}>
      <View className={'flex-row justify-between items-center gap-2 w-full'}>
        <View className={'flex-row items-center gap-2'}>
          <Checkbox checked={false} onCheckedChange={() => {}} id={name}/>
          <Label>{name}</Label>
        </View>
        <Badge variant={'outline'}>
          <StyledText className={'text-xs'}>{count}</StyledText>
        </Badge>
      </View>
    </View>
  )
}