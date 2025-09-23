import { Progress } from '@/components/ui';
import { EventCreateStepCircle } from '@/components/shared/event-create/event-create-step-circle.tsx';
import { Calendar, Clock, FileText, MapPin, Upload, Users } from 'lucide-react';

export const EventCreateStepper = () => {
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex justify-between items-center w-full'}>
        <span>Шаг 1 из 7</span>
        <span className={'text-muted-foreground'}>14% завершено</span>
      </div>
      <Progress value={14} />
      <h3 className={'font-medium text-xl'}>Основная информация</h3>

      <div className={'flex justify-between mt-4 max-[400px]:hidden'}>
        <EventCreateStepCircle variant={'active'} Icon={FileText} text={'Основная информация'} />
        <EventCreateStepCircle Icon={Calendar} text={'Дата и время'} />
        <EventCreateStepCircle Icon={Clock} text={'Программа'} />
        <EventCreateStepCircle Icon={MapPin} text={'Место проведения'} />
        <EventCreateStepCircle Icon={Users} text={'Участники'} />
        <EventCreateStepCircle Icon={Upload} text={'Медиа и настройки'} />
      </div>
    </div>
  );
};
