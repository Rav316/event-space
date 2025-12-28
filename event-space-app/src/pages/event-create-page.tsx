import { EventCreateWrapper, Wrapper } from '@/components/hoc';
import {
  DateTimeStep,
  EventCreateHeader,
  EventCreateStepper,
  EventLocationStep,
  EventProgramStep,
  MainInfoStep,
  MediaSettingsStep,
} from '@/components/shared/event-create';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStepper } from '@/hooks/use-stepper.ts';
import { Button, Spinner } from '@/components/ui';
import { eventCreateSteps } from '@/constants/event-create-steps.ts';
import { useEventCreationStore } from '@/store/use-event-creation-store.ts';
import { useEventCreateForms } from '@/hooks/use-event-create-forms.ts';
import { eventStepsGlobalSchema } from '@/schemas/event-steps-global-schema.ts';
import { z } from 'zod';
import { toast } from 'sonner';
import { useEventCreate } from '@/api/events/hooks.ts';
import { useEventImageStore } from '@/store/use-event-image-store.ts';
import { useSpaceFilterStore } from '@/store/use-space-filter-store.ts';

const EventCreatePage = () => {
  const { currentStep, back, next, goToStep } = useStepper(
    eventCreateSteps.length,
  );
  const event = useEventCreationStore((state) => state.event);
  const eventSteps = useEventCreationStore((state) => state.eventSteps);
  const addEventStep = useEventCreationStore((state) => state.addEventStep);
  const removeEventStep = useEventCreationStore(
    (state) => state.removeEventStep,
  );
  const updateEventStep = useEventCreationStore(
    (state) => state.updateEventStep,
  );
  const eventImage = useEventImageStore((state) => state.file);
  const previewUrl = useEventImageStore((state) => state.previewUrl);
  const setFile = useEventImageStore((state) => state.setFile);
  const clearImage = useEventImageStore((state) => state.clearImage);
  const setEventData = useEventCreationStore((state) => state.setEventData);
  const resetEventSteps = useEventCreationStore(
    (state) => state.resetEventSteps,
  );
  const resetEvent = useEventCreationStore((state) => state.resetEvent);
  const spaceFilter = useSpaceFilterStore((state) => state.filter);
  const setSpaceFilter = useSpaceFilterStore((state) => state.setFilter);

  const {
    mainInfoForm,
    eventDateTimeForm,
    eventStepForm,
    eventLocationForm,
    resetForms,
  } = useEventCreateForms();
  const eventCreateMutation = useEventCreate();

  const onClearClick = () => {
    resetEvent();
    resetEventSteps();
    clearImage();
    resetForms();
    goToStep(0);
    toast.success('Вы успешно очистили форму создания мероприятия');
  };

  const onStepNext = () => {
    switch (currentStep) {
      case 0:
        mainInfoForm.handleSubmit((data) => {
          setEventData(data);
          next();
        })();
        break;
      case 1:
        eventDateTimeForm.handleSubmit((data) => {
          setEventData(data);
          if (
            data.startTime !== event.startTime ||
            data.endTime !== event.endTime
          ) {
            resetEventSteps();
          }
          next();
        })();
        break;
      case 2:
        try {
          eventStepsGlobalSchema.parse({
            steps: eventSteps,
            eventStartTime: event.startTime,
            eventEndTime: event.endTime,
          });
          next();
        } catch (err) {
          if (err instanceof z.ZodError) {
            toast.error(err.issues.map((e) => e.message).join('\n'));
          }
        }
        break;
      case 3:
        eventLocationForm.handleSubmit((data) => {
          setEventData(data);
          next();
        })();
        break;
      case 4:
        eventCreateMutation.mutate({
          event: { ...event, steps: eventSteps },
          image: eventImage,
        });
        break;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <MainInfoStep form={mainInfoForm} />;
      case 1:
        return <DateTimeStep form={eventDateTimeForm} />;
      case 2:
        return (
          <EventProgramStep
            form={eventStepForm}
            event={event}
            eventSteps={eventSteps}
            addEventStep={addEventStep}
            updateEventStep={updateEventStep}
            removeEventStep={removeEventStep}
          />
        );
      case 3:
        return (
          <EventLocationStep
            form={eventLocationForm}
            event={event}
            building={0}
            filter={spaceFilter}
            setFilter={setSpaceFilter}
          />
        );
      case 4:
        return (
          <MediaSettingsStep
            imageUrl={previewUrl}
            setFile={setFile}
            clearImage={clearImage}
          />
        );
    }
  };

  return (
    <Wrapper>
      <div className={'flex flex-col py-5 gap-y-5'}>
        <EventCreateHeader onClearClick={onClearClick} />
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
          {eventCreateMutation.isPending ? (
            <div className={'flex items-center justify-center gap-x-2'}>
              <Spinner />
              <span>Создание...</span>
            </div>
          ) : (
            <span>
              {currentStep === eventCreateSteps.length - 1
                ? 'Создать'
                : 'Далее'}
            </span>
          )}
          <ChevronRight />
        </Button>
      </div>
    </Wrapper>
  );
};

export default EventCreatePage;
