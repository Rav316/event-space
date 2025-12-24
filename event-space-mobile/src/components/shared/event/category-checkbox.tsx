import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Checkbox, Label, StyledText } from '@/src/components/ui';
import { Badge } from '@/src/components/ui/badge';

interface Props extends Omit<React.ComponentProps<typeof Checkbox>, 'id'> {
  id: number;
  name: string;
  count: number;
}

export const CategoryCheckbox: React.FC<Props> = ({
  id,
  name,
  count,
  checked,
  onCheckedChange, // Assuming this handles the toggle
  ...props
}) => {
  const handleLabelPress = () => {
    if (onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <View className={'flex-row items-center justify-center'}>
      <View className={'flex-row justify-between items-center gap-2 w-full'}>
        <View className={'flex-row items-center gap-2'}>
          <Checkbox
            checked={checked}
            id={name}
            onCheckedChange={onCheckedChange}
            {...props}
          />
          <TouchableWithoutFeedback onPress={handleLabelPress}>
            <Label htmlFor={name}>{name}</Label>
          </TouchableWithoutFeedback>
        </View>
        <Badge variant={'outline'}>
          <StyledText className={'text-xs'}>{count}</StyledText>
        </Badge>
      </View>
    </View>
  );
};
