import { Pressable, TextInputProps, View } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyledInput } from '@/src/components/ui/styled-input';
import { cn } from '@/src/lib/utils';
import { useColorScheme } from 'nativewind';

interface Props extends TextInputProps {
  className?: string;
}

export const PasswordInput: React.FC<Props> = ({ className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useColorScheme();

  return (
    <View className={'relative justify-center'}>
      <StyledInput
        autoCapitalize={'none'}
        secureTextEntry={!showPassword}
        placeholder={'Введите пароль'}
        className={cn('pl-3 pr-10 text-foreground py-3', className)}
        {...props}
      />


      <Pressable
        onPress={() => setShowPassword((prev) => !prev)}
        className={'absolute right-3 top-0 bottom-0 justify-center z-10'}
      >
        {showPassword ? (
          <EyeOff
            className={'h-4 w-4'}
            color={theme.colorScheme === 'dark' ? '#fff' : '#000'}
          />
        ) : (
          <Eye
            className={'h-4 w-4'}
            color={theme.colorScheme === 'dark' ? '#fff' : '#000'}
          />
        )}
      </Pressable>
    </View>
  );
};