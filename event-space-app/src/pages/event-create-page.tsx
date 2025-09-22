import { EventCreateHeader } from '@/components/shared';
import { Wrapper } from '@/components/hoc';

const EventCreatePage = () => {
  return (
    <Wrapper>
      <div className={'flex flex-col py-5 gap-y-5'}>
        <EventCreateHeader />
      </div>
    </Wrapper>
  );
};

export default EventCreatePage;
