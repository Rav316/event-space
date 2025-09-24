import { Input, Label, RequiredMark, Textarea } from '@/components/ui';
import React from 'react';
import type { EventStep } from '@/components/shared/event-create/event-program-step.tsx';
import { Trash2 } from 'lucide-react';

interface Props {
  step: EventStep;
  onStepDelete: () => void
}

export const ProgramStep: React.FC<Props> = ({step, onStepDelete}) => {
  return (
    <div className={
      'relative flex flex-col gap-4 p-5 border border-dashed border-[#E5E5E5] rounded-md'
    }>
      <div className={'flex justify-between items-center'}>
        <Label htmlFor={'name'}>Название</Label>
        <Trash2
          onClick={onStepDelete}
          className={'text-red-500 cursor-pointer'}
          width={20}
          height={20}
        />
      </div>
      <Input id={'name'} placeholder={'Пример: Приветственное слово'} defaultValue={step.name}/>
      <div className={'flex w-full gap-4 max-[450px]:flex-col'}>
        <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
          <Label htmlFor={'start-time'}>
            Время начала <RequiredMark/>
          </Label>
          <Input id={'start-time'} type={'time'} defaultValue={step.startTime}/>
        </div>
        <div className={'flex flex-col gap-1 flex-1 max-[530px]:w-full'}>
          <Label htmlFor={'end-time'}>
            Время окончания <RequiredMark/>
          </Label>
          <Input id={'end-time'} type={'time'} defaultValue={step.endTime}/>
        </div>
      </div>
      <div className={'flex flex-col gap-1'}>
        <Label>Описание</Label>
        <Textarea
          className={'resize-none'}
          id={'description'}
          placeholder={'Краткое описание активности'}
          defaultValue={step.description}
        />
      </div>
    </div>
  )
}