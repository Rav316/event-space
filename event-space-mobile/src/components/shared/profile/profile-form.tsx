import { View } from 'react-native';
import { Skeleton, StyledInput, StyledLabel, StyledText } from '@/src/components/ui';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UserEditDto } from '@/src/api/users/models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/src/components/ui/select';
import { useFaculties } from '@/src/api/faculties/hooks';

interface Props {
  form: ReturnType<typeof useForm<UserEditDto>>;
}

const courses = [1, 2, 3, 4];

export const ProfileForm: React.FC<Props> = ({ form }) => {
  const { data: faculties, isPending: isFacultiesPending } = useFaculties();

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
          {isFacultiesPending ? (
            <Skeleton className={'h-10 w-full'} />
          ) : (
            <Controller
              control={form.control}
              name={'faculty'}
              render={({
                field: { value, onChange },
                fieldState: { error }
              }) => {
                console.log('all faculties', faculties);

                const selectedFaculty = faculties?.find(
                  (faculty) => faculty.id === value
                );

                return (
                  <>
                    <Select
                      value={
                        selectedFaculty
                          ? {
                              value: selectedFaculty.id.toString(),
                              label: selectedFaculty.name
                            }
                          : undefined
                      }
                      onValueChange={(val) => onChange(Number(val?.value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={'Факультет'} />
                      </SelectTrigger>
                      <SelectContent className={'w-full'}>
                        {faculties?.map((faculty) => (
                          <SelectItem
                            key={faculty.id}
                            value={faculty.id.toString()}
                            label={faculty.name}
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
                );
              }}
            />
          )}
        </View>
        <View className={'gap-1 flex-1 basis-0'}>
          <StyledLabel className={'text-base'}>Курс</StyledLabel>
          <Controller
            control={form.control}
            name={'course'}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              const selectedCourse = courses.find((c) => c === value);

              return (
                <>
                  <Select
                    value={
                      selectedCourse
                        ? {
                            value: selectedCourse.toString(),
                            label: `${selectedCourse} курс`
                          }
                        : undefined
                    }
                    onValueChange={(val) => onChange(Number(val?.value))}
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

                  <StyledText
                    className={
                      error
                        ? 'text-destructive min-h-[20px]'
                        : 'opacity-0 min-h-[20px]'
                    }
                  >
                    {error?.message ?? 'placeholder'}
                  </StyledText>
                </>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};
