import { Progress } from '@/components/ui';
import { EventCreateStepCircle } from '@/components/shared/event-create/event-create-step-circle.tsx';
import {
  Calendar,
  Clock,
  FileText,
  type LucideProps,
  MapPin,
  Upload,
  Users,
} from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils.ts';
import type { eventCreateStepType } from '@/types/event-create-step-type.ts';
import { eventCreateCategories } from '@/constants/event-create-categories.ts';

interface Props {
  currentStep: number;
}

const steps: {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
}[] = [
  {
    Icon: FileText,
    text: 'Основная информация',
  },
  {
    Icon: Calendar,
    text: 'Дата и время',
  },
  {
    Icon: Clock,
    text: 'Программа',
  },
  {
    Icon: MapPin,
    text: 'Место проведения',
  },
  {
    Icon: Users,
    text: 'Участники',
  },
  {
    Icon: Upload,
    text: 'Медиа и настройки',
  },
];

export const EventCreateStepper: React.FC<Props> = ({ currentStep }) => {
  const progress = eventCreateCategories.length > 0
    ? Math.round(
      (currentStep / (eventCreateCategories.length + 1)) * 100,
    )
    : 0;
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex justify-between items-center w-full'}>
        <span>Шаг 1 из 7</span>
        <span className={'text-muted-foreground'}>{progress}% завершено</span>
      </div>
      <Progress
        value={
          progress
        }
      />
      <h3 className={'font-medium text-xl'}>Основная информация</h3>

      <div className={'flex justify-between mt-4 max-[400px]:hidden'}>
        {steps.map((step, index) => (
          <EventCreateStepCircle
            key={index}
            Icon={step.Icon}
            text={step.text}
            variant={
              cn({
                active: currentStep === index,
                completed: currentStep > index,
                default: currentStep < index,
              }) as eventCreateStepType
            }
          />
        ))}
      </div>
    </div>
  );
};
