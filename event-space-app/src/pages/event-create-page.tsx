import { Wrapper } from '@/components/hoc';
import { EventCreateHeader, EventCreateStepper } from '@/components/shared/event-create';

const EventCreatePage = () => {
  return (
    <Wrapper>
      <div className={'flex flex-col py-5 gap-y-5'}>
        <EventCreateHeader />
        <EventCreateStepper />
      </div>
    </Wrapper>
  );
};

export default EventCreatePage;
