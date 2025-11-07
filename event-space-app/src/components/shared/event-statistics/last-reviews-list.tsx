import { ReviewStatItem } from '@/components/shared/event-review';
import { useReviews } from '@/api/event-reviews/hooks.ts';
import { useUserReviewFilterStore } from '@/store/use-user-review-filter-store.ts';
import { useInfiniteScroll } from '@/hooks/use-infinity-scroll.ts';
import { InfinityScrollLoading } from '@/components/shared/infinity-scroll-loading.tsx';
import { Link } from 'react-router';

export const LastReviewsList = () => {
  const filter = useUserReviewFilterStore((state) => state.filter);
  const {
    data: reviews,
    isPending: isReviewsPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReviews(filter);

  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isReviewsPending || !reviews) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={
        'flex flex-col gap-5 w-full border border-[#E5E5E5] rounded-2xl p-5'
      }
    >
      <span className={'font-medium text-xl'}>Мои последние отзывы</span>

      {reviews.pages.flatMap((page) =>
        page.content.map((review) => (
          <Link key={review.eventId} to={`/events/${review.eventId}`}>
            <ReviewStatItem
              name={review.eventName}
              category={review.eventCategory}
              date={review.eventDate}
              participantQuantity={review.participantQuantity}
              rating={review.rating}
              content={review.content}
              createdAt={review.createdAt}
            />
          </Link>
        )),
      )}

      {isFetchingNextPage && <InfinityScrollLoading />}
      {hasNextPage && <div ref={loadMoreRef} className="h-10" />}
    </div>
  );
};
