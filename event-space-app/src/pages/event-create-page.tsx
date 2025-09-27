import { EventCreateWrapper, Wrapper } from '@/components/hoc';
import {
  DateTimeStep,
  EventCreateHeader,
  EventCreateStepper,
  EventProgramStep,
  MainInfoStep,
  MediaSettingsStep,
} from '@/components/shared/event-create';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStepper } from '@/hooks/use-stepper.ts';
import { Button } from '@/components/ui';
import { eventCreateSteps } from '@/constants/event-create-steps.ts';
import { EventLocationStep } from '@/components/shared/event-create/event-location-step.tsx';
import { useEventCreationStore } from '@/store/use-event-creation-store.ts';
import { useEventCreateForms } from '@/hooks/use-event-create-forms.ts';

const EventCreatePage = () => {
  const { currentStep, back, next } = useStepper(eventCreateSteps.length);
  const setEventData = useEventCreationStore((state) => state.setEventData);
  console.log(currentStep);

  const {mainInfoForm} = useEventCreateForms();
  console.log(mainInfoForm.getValues());
  const onStepNext = () => {
    switch (currentStep) {
      case 0:
        mainInfoForm.handleSubmit(
          (data) => {
            console.log('✅ Valid:', data);
            setEventData(data);
            next();
          },
          (errors) => {
            console.log('❌ Validation errors:', errors);
          }
        )();
        break;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <MainInfoStep form={mainInfoForm} />;
      case 1:
        return <DateTimeStep />;
      case 2:
        return <EventProgramStep />;
      case 3:
        return <EventLocationStep />;
      case 4:
        return <MediaSettingsStep />;
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
        <Button onClick={onStepNext}>
          <span>Далее</span>
          <ChevronRight />
        </Button>
      </div>
    </Wrapper>
  );
};

export default EventCreatePage;
