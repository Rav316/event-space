import { EventCreateWrapper, Wrapper } from '@/components/hoc';
import {
  EventCreateHeader,
  EventCreateStepper, MainInfoStep
} from '@/components/shared/event-create';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useStepper } from '@/hooks/use-stepper.ts';
import { Button } from '@/components/ui';
import { eventCreateCategories } from '@/constants/event-create-categories.ts';

const EventCreatePage = () => {
  const {currentStep, back, next} = useStepper(eventCreateCategories.length);
  console.log(currentStep);

  return (
    <Wrapper>
      <div className={'flex flex-col py-5 gap-y-5'}>
        <EventCreateHeader />
        <EventCreateStepper currentStep={currentStep}/>
        <EventCreateWrapper Icon={FileText} text={'Основная информация'}>
          <MainInfoStep/>
        </EventCreateWrapper>
      </div>
      <div className={'flex justify-between'}>
        <Button disabled={currentStep === 0} variant={'outline'} onClick={back}>
          <ChevronLeft/>
          <span>Назад</span>
        </Button>
        <Button onClick={next}>
          <span>Далее</span>
          <ChevronRight/>
        </Button>
      </div>
    </Wrapper>
  );
};

export default EventCreatePage;
