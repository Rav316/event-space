import { Wrapper } from '@/components/hoc';
import { EventGroup, HeroSection } from '@/components/shared';
import { Button } from '@/components/ui';
import { ArrowRight, Calendar } from 'lucide-react';

const MainPage = () => {
  return (
    <>
      <div className={'w-full flex justify-center bg-[#F4F2F7]'}>
        <div
          className={
            'w-full max-w-[1720px] px-[20px] py-[100px] max-[675px]:py-[50px]'
          }
        >
          <HeroSection />
        </div>
      </div>

      <Wrapper>
        <div className={'flex max-[660px]:flex-col justify-between min-[660px]:items-center my-[35px] gap-y-5'}>
          <div className={'flex flex-col gap-y-2'}>
            <span className={'font-medium text-3xl'}>
              Ближайшие мероприятия
            </span>
            <span className={'text-muted-foreground'}>
              Самые актуальные события этой недели
            </span>
          </div>
          <Button variant={'outline'} className={'flex items-center gap-4'}>
            <Calendar />
            <span className={'font-medium'}>Все мероприятия</span>
            <ArrowRight />
          </Button>
        </div>
        <EventGroup />
      </Wrapper>
    </>
  );
};

export default MainPage;
