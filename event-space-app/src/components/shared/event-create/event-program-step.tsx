import {
  Button,
  FormErrorMessage,
  Input,
  Label,
  RequiredMark,
  Textarea,
} from '@/components/ui';
import { Clock, Plus } from 'lucide-react';
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ProgramStep } from '@/components/shared';
import { FormProvider, type useForm } from 'react-hook-form';
import type { EventCreateDto, EventStepCreateDto } from '@/api/events/model.ts';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface Props {
  form: ReturnType<typeof useForm<EventStepCreateDto>>;
  event: EventCreateDto;
  eventSteps: EventStepCreateDto[];
  addEventStep: (step: EventStepCreateDto) => void;
  updateEventStep: (index: number, data: Partial<EventStepCreateDto>) => void;
  removeEventStep: (index: number) => void;
  reorderEventSteps: (oldIndex: number, newIndex: number) => void;
}

export const EventProgramStep: React.FC<Props> = ({
  form,
  event,
  eventSteps,
  addEventStep,
  updateEventStep,
  removeEventStep,
  reorderEventSteps,
}) => {
  const dndId = useId();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const uidCounter = useRef(0);
  const [stepUids, setStepUids] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeWidth, setActiveWidth] = useState<number | null>(null);

  const generateUid = useCallback(() => {
    uidCounter.current += 1;
    return `step-uid-${uidCounter.current}`;
  }, []);

  useEffect(() => {
    setStepUids((prev) => {
      if (eventSteps.length > prev.length) {
        const newUids = [...prev];
        for (let i = prev.length; i < eventSteps.length; i++) {
          newUids.push(generateUid());
        }
        return newUids;
      }
      if (eventSteps.length < prev.length) {
        return prev.slice(0, eventSteps.length);
      }
      return prev;
    });
  }, [eventSteps.length, generateUid]);

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id as string);
    setActiveWidth(e.active.rect.current.initial?.width ?? null);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    setActiveId(null);
    setActiveWidth(null);

    if (!over || active.id === over.id) return;
    const oldIndex = stepUids.indexOf(active.id as string);
    const newIndex = stepUids.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    setStepUids((prev) => {
      const newUids = [...prev];
      const [moved] = newUids.splice(oldIndex, 1);
      newUids.splice(newIndex, 0, moved);
      return newUids;
    });

    reorderEventSteps(oldIndex, newIndex);
  };

  const endTime = form.watch('endTime');
  const activeIndex = activeId ? stepUids.indexOf(activeId) : -1;
  const activeStep = activeIndex >= 0 ? eventSteps[activeIndex] : null;

  const onClickAddEventStep = (data: EventStepCreateDto) => {
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
          Начало мероприятия - {event.startTime.slice(0, 5)}, конец -{' '}
          {event.endTime.slice(0, 5)}
        </h3>
        <span className={'text-muted-foreground text-sm'}>
          Добавьте пункты программы вашего мероприятия по времени. Это поможет
          участникам понять, что их ждёт.
        </span>
      </div>

      {eventSteps.length > 0 && stepUids.length === eventSteps.length && (
        <DndContext
          id={dndId}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => {
            setActiveId(null);
            setActiveWidth(null);
          }}
        >
          <SortableContext items={stepUids} strategy={verticalListSortingStrategy}>
            {eventSteps.map((step, index) => (
              <ProgramStep
                key={stepUids[index]}
                dragId={stepUids[index]}
                step={step}
                index={index}
                onStepDelete={() => {
                  setStepUids((prev) => prev.filter((_, i) => i !== index));
                  removeEventStep(index);
                }}
                updateStep={(i, data) => updateEventStep(i, data)}
              />
            ))}
          </SortableContext>
          <DragOverlay
            dropAnimation={{
              duration: 240,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {activeStep && activeId ? (
              <div style={{ width: activeWidth ?? undefined }}>
                <ProgramStep
                  dragId={activeId}
                  step={activeStep}
                  index={activeIndex}
                  isOverlay
                  onStepDelete={() => {}}
                  updateStep={() => {}}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

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
