import { Wrapper } from '@/components/hoc';
import {
  MyReviewsTab,
  EventStatisticsBlocks,
  OverviewTab,
  CategoriesStatisticsTab
} from '@/components/shared/event-statistics';
import { AnimatedTabs } from '@/components/shared';
import { useState } from 'react';
import { statisticsTabs } from '@/constants/statistics-tabs.ts';

const StatisticsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderTabContent = () => {
    switch (activeIndex) {
      case 0:
        return <OverviewTab/>;
      case 1:
        return <MyReviewsTab/>
      case 2:
        return <CategoriesStatisticsTab/>
    }
  }

  return (
    <Wrapper className={'flex flex-col gap-y-3 py-5 mt-5'}>
      <h1 className={'text-3xl font-medium'}>Статистика мероприятий</h1>
      <span className={'text-muted-foreground'}>
        Анализ посещаемости и эффективности мероприятий
      </span>
      <EventStatisticsBlocks />
      <div className={'max-w-[800px] max-[900px]:max-w-none'}>
        <AnimatedTabs
          tabs={statisticsTabs}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
      {renderTabContent()}
    </Wrapper>
  );
};

export default StatisticsPage;