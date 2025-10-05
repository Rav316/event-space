import {
  FormErrorMessage,
  Input,
  Label,
  RequiredMark,
  Textarea,
} from '@/components/ui';
import React from 'react';
import { Trash2 } from 'lucide-react';
import type { EventStepCreateDto } from '@/api/events/model.ts';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventStepSchema } from '@/schemas/event-step-schema.ts';

interface Props {
  step: EventStepCreateDto;
  index: number;
  onStepDelete: () => void;
  updateStep: (index: number, data: Partial<EventStepCreateDto>) => void;
  isLastStep: boolean;
}

export const ProgramStep: React.FC<Props> = ({
  step,
  index,
  onStepDelete,
  updateStep,
  isLastStep
}) => {
  const form = useForm({
    defaultValues: step,
    resolver: zodResolver(eventStepSchema),
  });

  const handleBlur = form.handleSubmit((data) => {
    updateStep(index, data);
  });


  return (
    <FormProvider {...form}>
      <div
        className={
          'relative flex flex-col gap-4 p-5 border border-dashed border-[#E5E5E5] rounded-md'
        }
      >
        <div className={'flex justify-between items-end'}>
          <Label htmlFor={`name-${index}`}>Название</Label>
          {isLastStep && (
            <Trash2
              onClick={onStepDelete}
              className={'text-red-500 cursor-pointer'}
              width={20}
              height={20}
            />
          )}
        </div>

        <div className={'flex flex-col gap-1'}>
          <Input
            id={`name-${index}`}
            placeholder={'Пример: Приветственное слово'}
            {...form.register('name')}
            onBlur={handleBlur}
          />
          {form.formState.errors.name && (
            <FormErrorMessage>
              {form.formState.errors.name.message}
            </FormErrorMessage>
          )}
        </div>

        <div className={'flex w-full gap-4 max-[450px]:flex-col'}>
          <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
            <Label>
              Время начала <RequiredMark />
            </Label>
            <input type="hidden" {...form.register('startTime')} value={step.startTime} />
            <span
              className="p-[7px] border rounded-sm bg-gray-100 text-sm"
            >
              {step.startTime}
            </span>
          </div>

          <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
            <Label htmlFor={`end-time-${index}`}>
              Время окончания <RequiredMark />
            </Label>
            <input type={'hidden'} {...form.register('endTime')} value={step.endTime} />
            <span
              className="p-[7px] border rounded-sm bg-gray-100 text-sm"
            >
              {step.endTime}
            </span>
          </div>
        </div>

        <div className={'flex flex-col gap-1'}>
          <Label>Описание</Label>
          <Textarea
            className={'resize-none'}
            id={`description-${index}`}
            placeholder={'Краткое описание активности'}
            {...form.register('description')}
            onBlur={handleBlur}
          />
          {form.formState.errors.description && (
            <FormErrorMessage>
              {form.formState.errors.description.message}
            </FormErrorMessage>
          )}
        </div>
      </div>
    </FormProvider>
  );
};
