import { Wrapper } from '@/components/hoc';
import {
  EventGroup,
  GetStartedSection,
  HeroSection,
} from '@/components/shared';
import { Button } from '@/components/ui';
import { ArrowRight, BellPlus, Calendar } from 'lucide-react';
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
          <Button variant={'outline'} className={'flex items-center gap-4'}>
            <Calendar />
            <span className={'font-medium'}>Все мероприятия</span>
            <ArrowRight />
          </Button>
        </div>
        <EventGroup isLoading={isPending} events={data || []} />
        {!isPending && data?.length && (
          <div className={'flex justify-center my-5'}>
            <span className={'text-muted-foreground text-center'}>
              Показано {data?.length} ближайших мероприятий
            </span>
          </div>
        )}
        <div
          className={
            'flex justify-center min-[528px]:items-center max-[528px]:flex-col gap-4 my-5'
          }
        >
          <Link to={'/events'}>
            <Button className={'h-[40px]'}>
              <Calendar />
              <span className={'font-medium'}>Смотреть все мероприятия</span>
              <ArrowRight />
            </Button>
          </Link>
          <Button variant={'outline'} className={'h-[40px]'}>
            <BellPlus />
            <span>Подписаться на уведомления</span>
          </Button>
        </div>
        <GetStartedSection className={'mb-5'} />
      </Wrapper>
    </>
  );
};

export default MainPage;
