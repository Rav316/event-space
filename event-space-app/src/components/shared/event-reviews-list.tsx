import { useEventReviews } from '@/api/events/hooks.ts';
import { useEventReviewFilterStore } from '@/store/use-event-review-filter-store.ts';
import React, { useEffect, useRef } from 'react';
import { Skeleton, Spinner } from '@/components/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { EventReview } from '@/components/shared/event-review.tsx';

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

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) await fetchNextPage();
    });
    const current = loadMoreRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasNextPage, fetchNextPage]);
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
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <EventReview review={review} />
                </motion.div>
              )),
            )}
          </AnimatePresence>

          {isFetchingNextPage && (
            <div className="flex items-center justify-center gap-2 text-center text-muted-foreground">
              <span>Загрузка...</span>
              <Spinner />
            </div>
          )}

          {hasNextPage && <div ref={loadMoreRef} className="h-10" />}
        </>
      )}
    </div>
  );
};
