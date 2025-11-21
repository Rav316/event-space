import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { forwardRef, useState } from 'react';
import { StyledInput } from '@/src/components/ui/styled-input';
import { cn } from '@/src/lib/utils';
import { useColorScheme } from 'nativewind';

interface Props extends TextInputProps {
  className?: string;
}

export const PasswordInput = forwardRef<TextInput, Props>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const theme = useColorScheme();
    const isDark = theme.colorScheme === 'dark';

    return (
      <View className={'relative justify-center'}>
        <StyledInput
          ref={ref}
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          textContentType={'oneTimeCode'}
          placeholder="Введите пароль"
          style={{ paddingVertical: 10 }}
          className={cn('pl-3 pr-10 text-foreground', className)}
          {...props}
        />

        <Pressable
          onPress={() => setShowPassword((prev) => !prev)}
          className={'absolute right-3 top-0 bottom-0 justify-center z-10'}
        >
          {showPassword ? (
            <EyeOff className={'h-4 w-4'} color={isDark ? '#fff' : '#000'} />
          ) : (
            <Eye className={'h-4 w-4'} color={isDark ? '#fff' : '#000'} />
          )}
        </Pressable>
      </View>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
