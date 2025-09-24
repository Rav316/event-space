import { EventCreateWrapper, Wrapper } from '@/components/hoc';
import {
  DateTimeStep,
  EventCreateHeader,
  EventCreateStepper, EventProgramStep,
  MainInfoStep
} from '@/components/shared/event-create';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStepper } from '@/hooks/use-stepper.ts';
import { Button } from '@/components/ui';
import { eventCreateCategories } from '@/constants/event-create-categories.ts';
import { eventCreateSteps } from '@/constants/event-create-steps.ts';

const EventCreatePage = () => {
  const { currentStep, back, next } = useStepper(eventCreateCategories.length);
  console.log(currentStep);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <MainInfoStep />;
      case 1:
        return <DateTimeStep />;
      case 2:
        return <EventProgramStep/>
    }
  };

  return (
    <Wrapper>
      <div className={'flex flex-col py-5 gap-y-5'}>
        <EventCreateHeader />
        <EventCreateStepper currentStep={currentStep} />
        <EventCreateWrapper
          Icon={eventCreateSteps[currentStep].Icon}
          text={eventCreateSteps[currentStep].text}
        >
          {renderCurrentStep()}
        </EventCreateWrapper>
      </div>
      <div className={'flex justify-between mb-5'}>
        <Button disabled={currentStep === 0} variant={'outline'} onClick={back}>
          <ChevronLeft />
          <span>Назад</span>
        </Button>
        <Button onClick={next}>
          <span>Далее</span>
          <ChevronRight />
        </Button>
      </div>
    </Wrapper>
  );
};

export default EventCreatePage;
