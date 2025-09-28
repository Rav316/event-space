import {
  Button,
  FormErrorMessage,
  Input,
  Label,
  RequiredMark,
  Textarea,
} from '@/components/ui';
import { Clock, Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { ProgramStep } from '@/components/shared';
import { FormProvider, type useForm } from 'react-hook-form';
import type { EventStep } from '@/api/events/model.ts';
import { useEventCreationStore } from '@/store/use-event-creation-store.ts';

interface Props {
  form: ReturnType<typeof useForm<EventStep>>;
}

export const EventProgramStep: React.FC<Props> = ({ form }) => {
  const endTime = form.watch('endTime');
  const addEventStep = useEventCreationStore((state) => state.addEventStep);
  const eventSteps = useEventCreationStore((state) => state.eventSteps);
  const updateEventStep = useEventCreationStore(
    (state) => state.updateEventStep,
  );
  const removeEventStep = useEventCreationStore(
    (state) => state.removeEventStep,
  );
  const event = useEventCreationStore((state) => state.event);

  const onClickAddEventStep = (data: EventStep) => {
    const startTime =
      eventSteps.length === 0
        ? event.startTime
        : eventSteps[eventSteps.length - 1].endTime;

    const newStep = {
      name: data.name,
      startTime,
      endTime: data.endTime,
      description: data.description,
    };

    addEventStep(newStep);

    form.reset({
      startTime: newStep.endTime,
      endTime: '',
      name: '',
      description: '',
    });
  };

  const isFormDisabled =
    eventSteps.length > 0 &&
    eventSteps[eventSteps.length - 1].endTime >= event.endTime;

  const currentStartTime =
    eventSteps.length === 0
      ? event.startTime
      : eventSteps[eventSteps.length - 1].endTime;

  useEffect(() => {
    form.setValue('startTime', currentStartTime);
  }, [currentStartTime, form]);

  useEffect(() => {
    if (endTime && endTime > event.endTime) {
      form.setValue('endTime', event.endTime);
    }
  }, [endTime, event.endTime, form]);

  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-1'}>
        <h3 className={'font-medium text-xl'}>
          Начало мероприятия - {event.startTime}, конец - {event.endTime}
        </h3>
        <span className={'text-muted-foreground text-sm'}>
          Добавьте пункты программы вашего мероприятия по времени. Это поможет
          участникам понять, что их ждёт.
        </span>
      </div>

      {eventSteps.length > 0 &&
        eventSteps.map((step, index) => (
          <ProgramStep
            key={index}
            step={step}
            index={index}
            isLastStep={index === eventSteps.length - 1}
            onStepDelete={() => removeEventStep(index)}
            updateStep={(i, data) => updateEventStep(i, data)}
          />
        ))}

      {!isFormDisabled && (
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onClickAddEventStep)}
            className={
              'flex flex-col gap-4 p-5 border border-dashed border-[#E5E5E5] rounded-md'
            }
          >
            <h3 className={'font-medium text-xl'}>Добавить пункт программы</h3>

            <input
              type="hidden"
              {...form.register('startTime')}
              value={currentStartTime}
            />

            <div className={'flex flex-col gap-1'}>
              <Label htmlFor={'name'}>
                Название
                <RequiredMark />
              </Label>
              <Input
                id={'name'}
                placeholder={'Пример: Приветственное слово'}
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <FormErrorMessage>
                  {form.formState.errors.name.message}
                </FormErrorMessage>
              )}
            </div>

            <div className={'flex w-full gap-4 max-[450px]:flex-col'}>
              {/* отображение startTime */}
              <div className={'flex flex-col gap-1 flex-1'}>
                <Label>Время начала</Label>
                <span className="p-[7px] border rounded-sm bg-gray-100 text-sm">
                  {currentStartTime}
                </span>
              </div>

              <div className={'flex flex-col gap-1 flex-1'}>
                <Label htmlFor={'end-time'}>
                  Время окончания
                  <RequiredMark />
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
              <Label htmlFor={'description'}>Описание</Label>
              <Textarea
                className={'resize-none'}
                id={'description'}
                placeholder={'Краткое описание активности'}
                {...form.register('description')}
              />
              {form.formState.errors.description && (
                <FormErrorMessage>
                  {form.formState.errors.description.message}
                </FormErrorMessage>
              )}
            </div>

            <Button type={'submit'}>
              <Plus />
              <span>Добавить пункт</span>
            </Button>
          </form>
        </FormProvider>
      )}

      {eventSteps.length === 0 && (
        <div
          className={
            'flex flex-col gap-4 items-center justify-center min-h-[200px]'
          }
        >
          <Clock className={'text-[#B8B8C0]'} width={50} height={50} />
          <div className={'flex flex-col items-center gap-0.5'}>
            <span className={'text-muted-foreground'}>
              Программа пока пуста
            </span>
            <p className={'text-muted-foreground text-sm'}>
              Добавьте первый пункт программы выше
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
