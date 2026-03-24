import {
  FormErrorMessage,
  Input,
  Label,
  RequiredMark,
  Textarea,
} from '@/components/ui';
import React, { useEffect } from 'react';
import { GripVertical, Trash2 } from 'lucide-react';
import type { EventStepCreateDto } from '@/api/events/model.ts';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventStepSchema } from '@/schemas/event-step-schema.ts';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  step: EventStepCreateDto;
  index: number;
  onStepDelete: () => void;
  updateStep: (index: number, data: Partial<EventStepCreateDto>) => void;
  dragId: string;
  isOverlay?: boolean;
}

export const ProgramStep: React.FC<Props> = ({
  step,
  index,
  onStepDelete,
  updateStep,
  dragId,
  isOverlay = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dragId, disabled: isOverlay });

  const style = {
    transform:
      isDragging && !isOverlay ? undefined : CSS.Translate.toString(transform),
    transition,
  };

  const form = useForm({
    defaultValues: {
      ...step,
      startTime: step.startTime.slice(0, 5),
      endTime: step.endTime.slice(0, 5),
    },
    resolver: zodResolver(eventStepSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    form.setValue('startTime', step.startTime.slice(0, 5));
    form.setValue('endTime', step.endTime.slice(0, 5));
  }, [step.startTime, step.endTime, form]);

  const handleBlur = async () => {
    const data = form.getValues();
    updateStep(index, data);
    await form.trigger();
  };

  return (
    <FormProvider {...form}>
      <div
        ref={isOverlay ? undefined : setNodeRef}
        style={isOverlay ? undefined : style}
        className={[
          'relative w-full min-w-0 flex flex-col gap-4 p-5 border border-dashed border-[#E5E5E5] rounded-md bg-card',
          isDragging && !isOverlay ? 'opacity-0 pointer-events-none' : '',
          isOverlay ? 'opacity-100 pointer-events-none' : '',
        ].join(' ')}
      >
        <div className={'flex justify-between items-center'}>
          <div className={'flex items-center gap-2'}>
            <button
              type="button"
              className={'cursor-grab active:cursor-grabbing touch-none text-[#B8B8C0] hover:text-[#888]'}
              {...attributes}
              {...listeners}
            >
              <GripVertical width={18} height={18} />
            </button>
            <Label htmlFor={`name-${index}`}>Название</Label>
          </div>
          {!isOverlay && (
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
            <input
              type="hidden"
              {...form.register('startTime')}
              value={step.startTime.slice(0, 5)}
            />
            <span className="p-[7px] border rounded-sm bg-gray-100 text-sm">
              {step.startTime.slice(0, 5)}
            </span>
          </div>

          <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
            <Label htmlFor={`end-time-${index}`}>
              Время окончания <RequiredMark />
            </Label>
            <input
              type={'hidden'}
              {...form.register('endTime')}
              value={step.endTime.slice(0, 5)}
            />
            <span className="p-[7px] border rounded-sm bg-gray-100 text-sm">
              {step.endTime.slice(0, 5)}
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
