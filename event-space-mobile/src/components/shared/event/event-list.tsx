import { FlatList, View, RefreshControl } from 'react-native';
import { EventSearch } from '@/src/components/shared/event/event-search';
import React, { useRef, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { EventFilters } from '@/src/components/shared/event/event-filters';
import { useEvents } from '@/src/api/events/hooks';
import { StyledText } from '@/src/components/ui';
import { Skeleton } from '@/src/components/ui/skeleton';
import { useEventFilterStore } from '@/src/store/use-event-filter-store';
import { AnimatedEventListItem } from '@/src/components/shared/event/animated-event-list-item';
import { useQueryClient } from '@tanstack/react-query';

export const EventList = () => {
  const listRef = useRef<FlatList>(null);

  useScrollToTop(listRef);

  const name = useEventFilterStore((state) => state.name);
  const categories = useEventFilterStore((state) => state.categories);
  const sort = useEventFilterStore((state) => state.sort);
  const period = useEventFilterStore((state) => state.period);

  const {
    data: events,
    isPending: isEventsPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useEvents({ name, categories, sort, period });

  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    queryClient.removeQueries({ queryKey: ['events'] }); // Clears all 'events' queries from cache
    await queryClient.refetchQueries({ queryKey: ['events'] });
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  const renderSkeleton = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} className="h-32 mb-3 rounded-lg" />
    ));
  };

  return (
    <FlatList
      ref={listRef}
      data={events?.pages.flatMap((page) => page.content) ?? []}
      renderItem={({ item }) => <AnimatedEventListItem event={item} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View className={'h-3'} />}
      ListHeaderComponent={
        <View className={'gap-4'}>
          <EventSearch />
          <EventFilters />
        </View>
      }
      ListHeaderComponentStyle={{ marginBottom: 24 }}
      ListEmptyComponent={
        isEventsPending ? (
          <View>{renderSkeleton(10)}</View>
        ) : (
          <StyledText className="text-center">No events found</StyledText>
        )
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <View className="pt-3">{renderSkeleton(3)}</View>
        ) : null
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      contentContainerClassName="pb-10"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};
