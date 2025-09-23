import { EventCreateStep, Wrapper } from '@/components/hoc';
import {
  EventCreateHeader,
  EventCreateStepper,
} from '@/components/shared/event-create';
import { FileText } from 'lucide-react';

const EventCreatePage = () => {
  return (
    <Wrapper>
      <div className={'flex flex-col py-5 gap-y-5'}>
        <EventCreateHeader />
        <EventCreateStepper />
        <EventCreateStep Icon={FileText} text={'Основная информация'} />
      </div>
    </Wrapper>
  );
};

export default EventCreatePage;
