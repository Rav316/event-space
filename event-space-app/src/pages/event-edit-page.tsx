import { EventCreateWrapper, Wrapper } from '@/components/hoc';
import { EventEditHeader } from '@/components/shared/event-edit';
import { useStepper } from '@/hooks/use-stepper.ts';
import { eventCreateSteps } from '@/constants/event-create-steps.ts';
import {
  DateTimeStep,
  EventCreateStepper,
  EventLocationStep,
  EventProgramStep,
  MainInfoStep,
  MediaSettingsStep,
} from '@/components/shared/event-create';
import { useEventEditForms } from '@/hooks/use-event-edit-forms.ts';
import { useParams } from 'react-router';
import { useEventByIdWithDetails, useEventUpdate } from '@/api/events/hooks.ts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Spinner } from '@/components/ui';
import { toast } from 'sonner';
import { z } from 'zod';
import { useEventEditState } from '@/hooks/use-event-edit-state.ts';
import { eventStepsGlobalSchema } from '@/schemas/event-steps-global-schema.ts';
import Page403 from '@/pages/page-403.tsx';

const EventEditPage = () => {
  const params = useParams();
  const eventId = Number(params.eventId);

  const { currentStep, back, next } = useStepper(eventCreateSteps.length);

  const { data: event, isPending: isEventPending } =
    useEventByIdWithDetails(eventId);

  const {
    eventData,
    updateEventData,
    eventSteps,
    addEventStep,
    updateEventStep,
    removeEventStep,
    resetEventSteps,
    spaceFilter,
    updateSpaceFilter,
    previewUrl,
    setFile,
    clearImage,
    imageFile,
  } = useEventEditState(event);

  const { mainInfoForm, eventDateTimeForm, eventLocationForm, eventStepForm } =
    useEventEditForms(event);

  const eventEditMutation = useEventUpdate();


  if (event && !event.canModify) {
    return <Page403 />;
  }

  const onStepNext = () => {
    switch (currentStep) {
      case 0:
        mainInfoForm.handleSubmit((data) => {
          updateEventData(data);
          next();
        })();
        break;
      case 1:
        eventDateTimeForm.handleSubmit((data) => {
          updateEventData(data);
          if (
            data.startTime !== event?.startTime ||
            data.endTime !== event?.endTime
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
            eventStartTime: event?.startTime,
            eventEndTime: event?.endTime,
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
          updateEventData(data);
          next();
        })();
        break;
      case 4:
        eventEditMutation.mutate({
          eventId,
          event: { ...eventData!, steps: eventSteps },
          image: imageFile,
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
        // TODO как то нормально обрабатывать евент
        // TODO сейчас у меня через знак "!", это не есть хорошо
        return (
          <EventProgramStep
            form={eventStepForm}
            event={event!}
            eventSteps={eventSteps}
            addEventStep={addEventStep}
            updateEventStep={updateEventStep}
            removeEventStep={removeEventStep}
          />
        );
      case 3:
        // TODO тут также обработать проблему с "!"
        return (
          <EventLocationStep
            form={eventLocationForm}
            event={event!}
            building={0}
            filter={spaceFilter}
            setFilter={updateSpaceFilter}
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
      {isEventPending ? (
        <div className={'flex justify-center items-center h-[calc(100vh-5rem)]'}>
          <Spinner />
        </div>
      ) : (
        <>
          <div className={'flex flex-col py-5 gap-y-5'}>
            <EventEditHeader />
            <EventCreateStepper currentStep={currentStep} />
            <EventCreateWrapper
              Icon={eventCreateSteps[currentStep].Icon}
              text={eventCreateSteps[currentStep].text}
            >
              {renderCurrentStep()}
            </EventCreateWrapper>
          </div>
          <div className={'flex justify-between mb-5'}>
            <Button
              disabled={currentStep === 0}
              variant={'outline'}
              onClick={back}
            >
              <ChevronLeft />
              <span>Назад</span>
            </Button>
            <Button onClick={onStepNext}>
              {eventEditMutation.isPending ? (
                <div className={'flex items-center justify-center gap-x-2'}>
                  <Spinner />
                  <span>Обновление...</span>
                </div>
              ) : (
                <span>
                  {currentStep === eventCreateSteps.length - 1
                    ? 'Обновить'
                    : 'Далее'}
                </span>
              )}
              <ChevronRight />
            </Button>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default EventEditPage;
