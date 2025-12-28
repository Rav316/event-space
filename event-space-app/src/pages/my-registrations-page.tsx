import { Wrapper } from '@/components/hoc';
import {
  AnimatedTabs,
  NoFinishedEventsBlock,
  NoUpcomingEventsBlock,
} from '@/components/shared';
import { EventList } from '@/components/shared/event';
import { useFinishedEvents, useUpcomingEvents } from '@/api/events/hooks.ts';
import { Skeleton } from '@/components/ui';
import { useInfiniteScroll } from '@/hooks/use-infinity-scroll.ts';
import { InfinityScrollLoading } from '@/components/shared/infinity-scroll-loading.tsx';
import { useMyRegistrationsStore } from '@/store/use-my-registrations-store.ts';
import { useMyEventStatistics } from '@/api/statistics/hooks.ts';

const MyRegistrationsPage = () => {
  const activeTabIndex = useMyRegistrationsStore(
    (state) => state.activeTabIndex,
  );
  const setActiveTabIndex = useMyRegistrationsStore(
    (state) => state.setActiveTabIndex,
  );
  const { data: statistics, isPending: isStatisticsPending } =
    useMyEventStatistics();

  const {
    data: upcomingEvents,
    fetchNextPage: fetchNextUpcoming,
    hasNextPage: hasMoreUpcoming,
    isFetchingNextPage: isFetchingMoreUpcoming,
    isPending: isUpcomingEventsPending,
  } = useUpcomingEvents({ enabled: activeTabIndex === 0 });

  const {
    data: finishedEvents,
    fetchNextPage: fetchNextFinished,
    hasNextPage: hasMoreFinished,
    isFetchingNextPage: isFetchingMoreFinished,
    isPending: isFinishedEventsPending,
  } = useFinishedEvents({ enabled: activeTabIndex === 1 });

  const upcomingRef = useInfiniteScroll<HTMLDivElement>({
    fetchNextPage: fetchNextUpcoming,
    hasNextPage: hasMoreUpcoming,
    isFetchingNextPage: isFetchingMoreUpcoming,
  });

  const finishedRef = useInfiniteScroll<HTMLDivElement>({
    fetchNextPage: fetchNextFinished,
    hasNextPage: hasMoreFinished,
    isFetchingNextPage: isFetchingMoreFinished,
  });

  const tabs =
    isStatisticsPending || !statistics
      ? []
      : [
          { text: `Предстоящие (${statistics.upcomingEventsCount})` },
          { text: `Завершённые (${statistics.finishedEventsCount})` },
        ];

  return (
    <Wrapper className="flex flex-col gap-4 my-5">
      <h1 className="text-3xl font-medium">Мои регистрации</h1>
      <span className="text-muted-foreground">
        Управляйте своими регистрациями и отслеживайте предстоящие мероприятия
      </span>

      <div className="flex items-center justify-between gap-2 w-full max-[550px]:flex-col max-[550px]:items-start">
        <div className="w-[370px] max-[550px]:w-full">
          {tabs.length === 0 ? (
            <Skeleton className="h-10 w-[370px] rounded-2xl max-[550px]:w-full" />
          ) : (
            <AnimatedTabs
              tabs={tabs}
              activeIndex={activeTabIndex}
              setActiveIndex={setActiveTabIndex}
            />
          )}
        </div>
      </div>

      {activeTabIndex === 0 &&
        (isUpcomingEventsPending ? (
          <Skeleton className="h-[200px] w-full rounded-2xl" />
        ) : (
          <>
            {!upcomingEvents ||
            upcomingEvents.pages.flatMap((p) => p.content).length === 0 ? (
              <NoUpcomingEventsBlock />
            ) : (
              <>
                <EventList
                  events={upcomingEvents.pages.flatMap((p) => p.content)}
                  isLoading={isUpcomingEventsPending}
                />
                <div
                  ref={upcomingRef}
                  className="h-10 flex justify-center items-center"
                >
                  {isFetchingMoreUpcoming && <InfinityScrollLoading />}
                </div>
              </>
            )}
          </>
        ))}

      {activeTabIndex === 1 &&
        (isFinishedEventsPending ? (
          <Skeleton className="h-[200px] w-full rounded-2xl" />
        ) : (
          <>
            {!finishedEvents ||
            finishedEvents.pages.flatMap((p) => p.content).length === 0 ? (
              <NoFinishedEventsBlock />
            ) : (
              <>
                <EventList
                  events={finishedEvents.pages.flatMap((p) => p.content)}
                  isLoading={isFinishedEventsPending}
                />
                <div
                  ref={finishedRef}
                  className="h-10 flex justify-center items-center"
                >
                  {isFetchingMoreFinished && <InfinityScrollLoading />}
                </div>
              </>
            )}
          </>
        ))}
    </Wrapper>
  );
};

export default MyRegistrationsPage;
