import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UserLoginDto } from '@/src/api/auth/models';
import { View } from 'react-native';
import {
  PasswordInput,
  StyledButton,
  StyledInput,
  StyledLabel,
  StyledText
} from '@/src/components/ui';

interface Props {
  form: ReturnType<typeof useForm<UserLoginDto>>;
  onSubmit: (data: UserLoginDto) => void;
}

export const LoginForm: React.FC<Props> = ({ form, onSubmit }) => {
  console.log('new form errors', form.formState.errors);
  return (
    <View className={'w-full gap-4'}>
      <View className={'gap-1'}>
        <StyledLabel className={'text-base'} htmlFor={'email'}>
          Email
        </StyledLabel>
        <Controller
          control={form.control}
          name="email"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error }
          }) => (
            <>
              <StyledInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                placeholder="example@verifier.ru"
              />
              {error ? (
                <StyledText className="text-destructive min-h-[20px]">
                  {error.message}
                </StyledText>
              ) : (
                <StyledText className="opacity-0 min-h-[20px]">
                  placeholder
                </StyledText>
              )}
            </>
          )}
        />
      </View>
      <View className={'gap-1'}>
        <StyledLabel className={'text-base'} htmlFor={'password'}>
          Пароль
        </StyledLabel>
        <Controller
          control={form.control}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error }
          }) => (
            <>
              <PasswordInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {error ? (
                <StyledText className="text-destructive min-h-[20px]">
                  {error.message}
                </StyledText>
              ) : (
                <StyledText className="opacity-0 min-h-[20px]">
                  placeholder
                </StyledText>
              )}
            </>
          )}
          name={'password'}
        />
      </View>
      <StyledButton className={'mt-3'} onPress={form.handleSubmit(onSubmit)}>
        <StyledText className={'text-base'}>Войти</StyledText>
      </StyledButton>
    </View>
  );
};
