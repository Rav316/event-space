import { Wrapper } from '@/components/hoc';
import {
  EventGroup,
  GetStartedSection,
  HeroSection, NoActualEventsBlock
} from '@/components/shared';
import { Button } from '@/components/ui';
import { ArrowRight, Calendar } from 'lucide-react';
import { useActualEvents } from '@/api/events/hooks.ts';
import { Link } from 'react-router';

const MainPage = () => {
  const { data, isPending } = useActualEvents();

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
        <div
          className={
            'flex max-[660px]:flex-col justify-between min-[660px]:items-center my-[35px] gap-y-5'
          }
        >
          <div className={'flex flex-col gap-y-2'}>
            <span className={'font-medium text-3xl'}>
              Ближайшие мероприятия
            </span>
            <span className={'text-muted-foreground'}>
              Самые актуальные события этой недели
            </span>
          </div>
          <Link to={'/events'}>
            <Button variant={'outline'} className={'flex items-center gap-4'}>
              <Calendar />
              <span className={'font-medium'}>Все мероприятия</span>
              <ArrowRight />
            </Button>
          </Link>
        </div>
        <div className={'flex flex-col gap-5'}>
          {isPending || (data?.length ?? 0) > 0 ? (
            <>
              <EventGroup isLoading={isPending} events={data || []} />

              {!isPending && (data?.length ?? 0) > 0 && (
                <div className="flex justify-center my-5">
                <span className="text-muted-foreground text-center">
                  Показано {data?.length ?? 0} ближайших мероприятий
                </span>
                </div>
              )}
            </>
          ) : (
            <NoActualEventsBlock/>
          )}

          <GetStartedSection className={'mb-5'} />
        </div>
      </Wrapper>
    </>
  );
};

export default MainPage;
