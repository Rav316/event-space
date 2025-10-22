import { Wrapper } from '@/components/hoc';
import { AnimatedTabs } from '@/components/shared';
import type { Tab } from '@/types/tab.ts';
import { useState } from 'react';
import { Button } from '@/components/ui';
import { Funnel } from 'lucide-react';
import { EventList } from '@/components/shared/event';

const tabs: Tab[] = [{ text: 'Предстоящие (3)' }, { text: 'Завершенные (2)' }];

const MyRegistrationsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Wrapper className={'flex flex-col gap-4 my-5'}>
      <h1 className={'text-3xl font-medium'}>Мои регистрации</h1>
      <span className={'text-muted-foreground'}>
        Управляйте своими регистрациями и отслеживайте предстоящие мероприятия
      </span>
      <div className={'flex items-center justify-between gap-2 w-full'}>
        <div className={'w-[350px]'}>
          <AnimatedTabs
            tabs={tabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
        <Button variant={'outline'}>
          <Funnel/>
          <span>Фильтры</span>
        </Button>
      </div>
      <EventList/>
    </Wrapper>
  );
};

export default MyRegistrationsPage;
