import { Progress } from '@/components/ui';
import { EventCreateStepCircle } from '@/components/shared/event-create/event-create-step-circle.tsx';
import React from 'react';
import { cn } from '@/lib/utils.ts';
import type { EventCreateStep } from '@/types/event-create-step.ts';
import { eventCreateSteps } from '@/constants/event-create-steps.ts';

interface Props {
  currentStep: number;
}


export const EventCreateStepper: React.FC<Props> = ({ currentStep }) => {
  const progress = eventCreateSteps.length > 0
    ? Math.round(
      (currentStep / (eventCreateSteps.length)) * 100,
    )
    : 0;
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex justify-between items-center w-full'}>
        <span>Шаг {currentStep + 1} из {eventCreateSteps.length}</span>
        <span className={'text-muted-foreground'}>{progress}% завершено</span>
      </div>
      <Progress
        value={
          progress
        }
      />
      <h3 className={'font-medium text-xl'}>Основная информация</h3>

      <div className={'flex justify-between mt-4 max-[400px]:hidden'}>
        {eventCreateSteps.map((step, index) => (
          <EventCreateStepCircle
            key={index}
            Icon={step.Icon}
            text={step.text}
            variant={
              cn({
                active: currentStep === index,
                completed: currentStep > index,
                default: currentStep < index,
              }) as EventCreateStep
            }
          />
        ))}
      </div>
    </div>
  );
};
