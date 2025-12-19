import { View } from 'react-native';
import { StyledInput, StyledLabel, StyledText } from '@/src/components/ui';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UserEditDto } from '@/src/api/user/models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/src/components/ui/select';

interface Props {
  form: ReturnType<typeof useForm<UserEditDto>>;
}

const faculties = [
  { value: '1', label: 'Факультет' },
  { value: '2', label: 'Факультет 2' },
  { value: '3', label: 'Факультет 3' }
];

const courses = [1, 2, 3, 4];

export const ProfileForm: React.FC<Props> = ({ form }) => {
  console.log('form data', form.formState);

  return (
    <View className={'w-full gap-4 mt-6'}>
      <View className={'gap-1'}>
        <StyledLabel className={'text-base'}>Email</StyledLabel>
        <Controller
          control={form.control}
          name={'email'}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error }
          }) => (
            <>
              <StyledInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize={'none'}
                placeholder={'example@verifier.ru'}
                textContentType={'emailAddress'}
              />
              {error ? (
                <StyledText className={'text-destructive min-h-[20px]'}>
                  {error.message}
                </StyledText>
              ) : (
                <StyledText className={'opacity-0 min-h-[20px]'}>
                  placeholder
                </StyledText>
              )}
            </>
          )}
        />
      </View>
      <View className={'flex-row gap-2 w-full'}>
        <View className={'gap-1 flex-1 basis-0'}>
          <StyledLabel className={'text-base'}>Имя</StyledLabel>
          <Controller
            control={form.control}
            name={'firstName'}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error }
            }) => (
              <>
                <StyledInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={'Иван'}
                />
                {error ? (
                  <StyledText className={'text-destructive min-h-[20px]'}>
                    {error.message}
                  </StyledText>
                ) : (
                  <StyledText className={'opacity-0 min-h-[20px]'}>
                    placeholder
                  </StyledText>
                )}
              </>
            )}
          />
        </View>

        <View className={'gap-1 flex-1 basis-0'}>
          <StyledLabel className={'text-base'}>Фамилия</StyledLabel>
          <Controller
            control={form.control}
            name={'lastName'}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error }
            }) => (
              <>
                <StyledInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={'Иванов'}
                />
                {error ? (
                  <StyledText className={'text-destructive min-h-[20px]'}>
                    {error.message}
                  </StyledText>
                ) : (
                  <StyledText className={'opacity-0 min-h-[20px]'}>
                    placeholder
                  </StyledText>
                )}
              </>
            )}
          />
        </View>
      </View>
      <View className={'flex-row gap-2 w-full'}>
        <View className={'gap-1 flex-1 basis-0'}>
          <StyledLabel className={'text-base'}>Факультет</StyledLabel>
          <Controller
            control={form.control}
            name={'faculty'}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error }
            }) => (
              <>
                <Select
                  value={{
                    value: faculties[0].value,
                    label: faculties[0].label
                  }}
                  onValueChange={(val) => onChange(Number(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={'Факультет'} />
                  </SelectTrigger>
                  <SelectContent className={'w-full'}>
                    {faculties.map((faculty) => (
                      <SelectItem
                        key={faculty.value}
                        value={faculty.value}
                        label={faculty.label}
                      />
                    ))}
                  </SelectContent>
                </Select>
                {error ? (
                  <StyledText className={'text-destructive min-h-[20px]'}>
                    {error.message}
                  </StyledText>
                ) : (
                  <StyledText className={'opacity-0 min-h-[20px]'}>
                    placeholder
                  </StyledText>
                )}
              </>
            )}
          />
        </View>
        <View className={'gap-1 flex-1 basis-0'}>
          <StyledLabel className={'text-base'}>Курс</StyledLabel>
          <Controller
            control={form.control}
            name={'course'}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error }
            }) => (
              <>
                <Select
                  value={{
                    value: courses[0].toString(),
                    label: `${courses[0]} курс`
                  }}
                  onValueChange={(val) => onChange(Number(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={'Курс'} />
                  </SelectTrigger>
                  <SelectContent className={'w-full'}>
                    {courses.map((course) => (
                      <SelectItem
                        key={course}
                        value={course.toString()}
                        label={`${course} курс`}
                      />
                    ))}
                  </SelectContent>
                </Select>
                {error ? (
                  <StyledText className={'text-destructive min-h-[20px]'}>
                    {error.message}
                  </StyledText>
                ) : (
                  <StyledText className={'opacity-0 min-h-[20px]'}>
                    placeholder
                  </StyledText>
                )}
              </>
            )}
          />
        </View>
      </View>
    </View>
  );
};
