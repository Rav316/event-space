import { FlatList, View } from 'react-native';
import { EventListItem } from '@/src/components/shared/event/event-list-item';
import { EventSearch } from '@/src/components/shared/event/event-search';
import { useRef } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { EventFilters } from '@/src/components/shared/event/event-filters';
import { useEvents } from '@/src/api/events/hooks';
import { StyledText } from '@/src/components/ui';
import { Skeleton } from '@/src/components/ui/skeleton';

export const EventList = () => {
  const listRef = useRef<FlatList>(null);

  useScrollToTop(listRef);


  const {
    data: events,
    isPending: isEventsPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useEvents({});

  const loadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  const renderSkeleton = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} className="h-32 mb-3 rounded-lg" /> // Adjust height and styles to match EventListItem approximate size
    ));
  };

  return (
    <FlatList
      ref={listRef}
      data={events?.pages.flatMap((page) => page.content) ?? []}
      renderItem={({ item }) => <EventListItem event={item} />}
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
          <View>{renderSkeleton(10)}</View> // Show 10 skeletons during initial load
        ) : (
          <StyledText className="text-center">No events found</StyledText>
        )
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <View className="pt-3">{renderSkeleton(3)}</View> // Show 3 skeletons while loading more
        ) : null
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      contentContainerClassName="pb-10"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};
