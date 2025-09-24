import { Button, Input, Label, Textarea } from '@/components/ui';
import { Clock, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { ProgramStep } from '@/components/shared';

export interface EventStep {
  name: string;
  startTime: string;
  endTime: string;
  description: string;
}

export const EventProgramStep = () => {
  const [eventSteps, setEventSteps] = useState<EventStep[]>([]);

  const addEventStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newStep: EventStep = {
      name: (formData.get('name') as string) || '',
      startTime: (formData.get('start-time') as string) || '',
      endTime: (formData.get('end-time') as string) || '',
      description: (formData.get('description') as string) || '',
    };

    setEventSteps((prev) => [...prev, newStep]);
    form.reset();
  };

  return (
    <div className={'flex flex-col gap-4'}>
      <span className={'text-muted-foreground text-sm'}>
        Добавьте пункты программы вашего мероприятия по времени. Это поможет
        участникам понять, что их ждёт.
      </span>

      {eventSteps.length > 0 &&
        eventSteps.map((step, index) => (
          <ProgramStep
            key={index}
            step={step}
            onStepDelete={() =>
              setEventSteps((prev) => prev.filter((_, i) => i !== index))
            }
          />
        ))}

      <form
        onSubmit={addEventStep}
        className={
          'flex flex-col gap-4 p-5 border border-dashed border-[#E5E5E5] rounded-md'
        }
      >
        <h3 className={'font-medium text-xl'}>Добавить пункт программы</h3>
        <div className={'flex flex-col gap-1'}>
          <Label htmlFor={'name'}>Название</Label>
          <Input
            id={'name'}
            name={'name'}
            placeholder={'Пример: Приветственное слово'}
          />
        </div>
        <div className={'flex w-full gap-4 max-[450px]:flex-col'}>
          <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
            <Label htmlFor={'start-time'}>Время начала</Label>
            <Input id={'start-time'} name={'start-time'} type={'time'} />
          </div>
          <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
            <Label htmlFor={'end-time'}>Время окончания</Label>
            <Input id={'end-time'} name={'end-time'} type={'time'} />
          </div>
        </div>
        <div className={'flex flex-col gap-1'}>
          <Label htmlFor={'description'}>Описание</Label>
          <Textarea
            className={'resize-none'}
            id={'description'}
            name={'description'}
            placeholder={'Краткое описание активности'}
          />
        </div>
        <Button type={'submit'}>
          <Plus />
          <span>Добавить пункт</span>
        </Button>
      </form>

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
