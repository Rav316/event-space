import { Stack, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { SvgUri } from 'react-native-svg';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  RefreshControl,
  ScrollView,
  View
} from 'react-native';
import { Calendar, Flame, MapPin, Share2, Users } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Badge } from '@/src/components/ui/badge';
import { Skeleton, StyledText } from '@/src/components/ui';
import { categoryColors } from '@/src/constants/category-colors';
import {
  EventBadge,
  EventDescriptionBlock,
  EventOrganizerBlock,
  EventPageSkeleton,
  EventProgramBlock,
  EventShareBlock
} from '@/src/components/shared/event';
import {
  initialWindowMetrics,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import {
  EventReviewsBlock,
  EventReviewsList
} from '@/src/components/shared/event-review';
import {
  useEventById,
  useEventReviews,
  useStepsByEvent
} from '@/src/api/events/hooks';
import {
  useMarkReviewAsHelpful,
  useUnmarkReviewAsHelpful
} from '@/src/api/event-reviews/hooks';
import { getEventImageUrl } from '@/src/utils/get-event-image-url';
import { getPlaceholderImageUrl } from '@/src/utils/get-placeholder-image-url';
import { formatDate } from '@/src/utils/format-date';
import { formatDateToRuFormat } from '@/src/utils/format-date-to-ru-format';
import { compareWithToday } from '@/src/utils/compare-with-current-date';
import React, { useCallback, useState } from 'react';
import { EventReviewFilter } from '@/src/api/event-reviews/model';
import { queryClient } from '@/src/api/queryClient';
import { EVENT_KEYS } from '@/src/api/events/keys';

const REVIEW_FILTER: EventReviewFilter = {};

const EventPage = () => {
  const id = Number(useLocalSearchParams().id);
  const { colorScheme } = useColorScheme();
  const [imageError, setImageError] = useState(false);

  const insets = useSafeAreaInsets();

  const bottomInset =
    insets.bottom || initialWindowMetrics?.insets?.bottom || 0;

  const { data: event } = useEventById(id);

  const { data: eventSteps, isPending: isStepsPending } = useStepsByEvent(id);

  const reviewFilter = REVIEW_FILTER;

  const {
    data: reviews,
    isPending: isReviewsPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useEventReviews(id, reviewFilter);

  const markHelpful = useMarkReviewAsHelpful(id, reviewFilter);
  const unmarkHelpful = useUnmarkReviewAsHelpful(id, reviewFilter);

  const handleHelpfulPress = useCallback(
    (reviewId: number) => {
      const allReviews = reviews?.pages.flatMap((page) => page.content);
      const review = allReviews?.find((r) => r.id === reviewId);
      if (!review) return;

      if (review.userMarkedHelpful) {
        unmarkHelpful.mutate(reviewId);
      } else {
        markHelpful.mutate(reviewId);
      }
    },
    [reviews, markHelpful, unmarkHelpful]
  );

  const handleScroll = useCallback(
    async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } =
        e.nativeEvent;
      const distanceFromBottom =
        contentSize.height - layoutMeasurement.height - contentOffset.y;

      if (distanceFromBottom < 200 && hasNextPage && !isFetchingNextPage) {
        await fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await Promise.all([
        queryClient.refetchQueries({ queryKey: EVENT_KEYS.byId(id) }),
        queryClient.refetchQueries({ queryKey: EVENT_KEYS.steps(id) }),
        queryClient.refetchQueries({ queryKey: EVENT_KEYS.reviews(id, reviewFilter) }),
        queryClient.refetchQueries({ queryKey: EVENT_KEYS.reviewsStatistics(id) })
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: `Мероприятие #${id}` }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
      >
        {!event || refreshing ? (
          <EventPageSkeleton />
        ) : (
          <View
            className={'gap-4 px-3 pt-3'}
            style={{ paddingBottom: bottomInset }}
          >
            <View className={'relative'}>
              {event.imageUrl && !imageError ? (
                <Image
                  source={{ uri: getEventImageUrl(event.imageUrl) }}
                  style={{ width: '100%', height: 200, borderRadius: 16 }}
                  contentFit={'cover'}
                  onError={() => setImageError(true)}
                />
              ) : (
                <View
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 16,
                    overflow: 'hidden'
                  }}
                >
                  <SvgUri
                    uri={getPlaceholderImageUrl(event.name)}
                    width={'100%'}
                    height={'100%'}
                  />
                </View>
              )}
              <Badge
                className={
                  'absolute top-2.5 left-2.5 ' +
                  categoryColors[event.category.id - 1].badge
                }
              >
                <StyledText
                  className={categoryColors[event.category.id - 1].text}
                >
                  {event.category.name}
                </StyledText>
              </Badge>

              <Pressable
                className={
                  'absolute top-2.5 right-2.5 w-9 h-9 rounded-xl items-center justify-center bg-white/60 dark:bg-black/50'
                }
              >
                <Share2
                  size={18}
                  color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
                />
              </Pressable>
            </View>
            <StyledText className={'font-medium text-xl'}>
              {event.name}
            </StyledText>
            {event.description && (
              <EventDescriptionBlock description={event.description} />
            )}
            {isStepsPending ? (
              <View
                className={
                  'border border-black/20 dark:border-white/20 rounded-xl p-3 gap-2'
                }
              >
                <Skeleton className={'h-7 w-48 rounded'} />
                <View className={'gap-4 mt-1'}>
                  {Array.from({length: 3}).map((_, i) => (
                    <View key={i} className={'flex-row gap-4'}>
                      <Skeleton className={'h-5 w-14 rounded'} />
                      <View className={'flex-1 gap-1.5'}>
                        <Skeleton className={'h-5 w-3/4 rounded'} />
                        <Skeleton className={'h-4 w-full rounded'} />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              eventSteps &&
              eventSteps.length > 0 && <EventProgramBlock steps={eventSteps} />
            )}
            <View className={'gap-2'}>
              <EventBadge
                Icon={Calendar}
                text={formatDate(event.eventDate)}
                caption={`${event.startTime.slice(0, 5)} - ${event.endTime.slice(0, 5)}`}
              />
              <EventBadge
                Icon={MapPin}
                text={`${event.space.building.name}, ${event.space.name}`}
                caption={`${event.space.building.address}`}
              />
              <EventBadge
                Icon={Users}
                text={`${event.registeredUsers}/${event.participantQuantity}`}
                caption={'участников'}
              />
              <EventBadge
                Icon={Flame}
                text={
                  event.deadline ? formatDateToRuFormat(event.deadline) : '---'
                }
                caption={'Дедлайн регистрации'}
                iconColor={
                  compareWithToday(event.deadline) === -1 ? 'orange' : undefined
                }
              />
            </View>
            {event.author && (
              <EventOrganizerBlock
                firstName={event.author?.firstName}
                lastName={event.author?.lastName}
                faculty={event.author?.faculty}
              />
            )}
            <EventShareBlock />
            <EventReviewsBlock event={event} />
            <EventReviewsList
              reviews={reviews}
              isPending={isReviewsPending}
              isFetchingNextPage={isFetchingNextPage}
              onHelpfulPress={handleHelpfulPress}
            />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default EventPage;
