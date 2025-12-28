import { FormErrorMessage, Input, Label, RequiredMark } from '@/components/ui';
import { FormProvider, type useForm } from 'react-hook-form';
import React from 'react';
import type { EventDateTime } from '@/schemas/event-create-date-time-schema.ts';

interface Props {
  form: ReturnType<typeof useForm<EventDateTime>>;
}

export const DateTimeStep: React.FC<Props> = ({ form }) => {
  return (
    <FormProvider {...form}>
      <form className={'flex flex-col gap-4'}>
        <div className={'flex items-start gap-4 w-full max-[530px]:flex-col'}>
          <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
            <Label htmlFor={'event-date'}>
              Дата проведения <RequiredMark />
            </Label>
            <Input
              id={'event-date'}
              type={'date'}
              max={'2099-12-31'}
              {...form.register('eventDate')}
            />
            {form.formState.errors.eventDate && (
              <FormErrorMessage>
                {form.formState.errors.eventDate.message}
              </FormErrorMessage>
            )}
          </div>
          <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
            <Label htmlFor={'start-time'}>
              Время начала <RequiredMark />
            </Label>
            <Input
              id={'start-time'}
              type={'time'}
              {...form.register('startTime')}
            />
            {form.formState.errors.startTime && (
              <FormErrorMessage>
                {form.formState.errors.startTime.message}
              </FormErrorMessage>
            )}
          </div>
          <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
            <Label htmlFor={'end-time'}>
              Время окончания <RequiredMark />
            </Label>
            <Input
              id={'end-time'}
              type={'time'}
              {...form.register('endTime')}
            />
            {form.formState.errors.endTime && (
              <FormErrorMessage>
                {form.formState.errors.endTime.message}
              </FormErrorMessage>
            )}
          </div>
        </div>
        <div className={'flex flex-col gap-1'}>
          <Label htmlFor={'deadline'}>Дедлайн регистрации</Label>
          <Input
            id={'deadline'}
            type={'date'}
            max={'2099-12-31'}
            {...form.register('deadline')}
          />
          {form.formState.errors.deadline && (
            <FormErrorMessage>
              {form.formState.errors.deadline.message}
            </FormErrorMessage>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
