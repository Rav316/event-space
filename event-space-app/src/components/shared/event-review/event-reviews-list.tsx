import { useEventReviews } from '@/api/events/hooks.ts';
import { useEventReviewFilterStore } from '@/store/use-event-review-filter-store.ts';
import React from 'react';
import { Skeleton } from '@/components/ui';
import { AnimatePresence } from 'framer-motion';
import { EventReview } from '@/components/shared/event-review';
import { useInfiniteScroll } from '@/hooks/use-infinity-scroll.ts';
import { InfinityScrollLoading } from '@/components/shared/infinity-scroll-loading.tsx';
import { AnimatedReviewListItem } from '@/components/hoc/animated-review-list-item.tsx';

interface Props {
  eventId: number;
}

export const EventReviewsList: React.FC<Props> = ({ eventId }) => {
  const filter = useEventReviewFilterStore((state) => state.filter);

  const {
    data: reviews,
    isPending: isReviewsPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEventReviews(eventId, filter);

  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div className="flex flex-col gap-4">
      {isReviewsPending || !reviews ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[200px]" />
          ))}
        </div>
      ) : (
        <>
          <AnimatePresence mode="popLayout">
            {reviews.pages.flatMap((page) =>
              page.content.map((review) => (
                <AnimatedReviewListItem key={review.id}>
                  <EventReview review={review} />
                </AnimatedReviewListItem>
              )),
            )}
          </AnimatePresence>

          {isFetchingNextPage && <InfinityScrollLoading />}

          {hasNextPage && <div ref={loadMoreRef} className="h-10" />}
        </>
      )}
    </div>
  );
};
