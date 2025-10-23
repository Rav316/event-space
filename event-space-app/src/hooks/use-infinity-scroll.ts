import { useEffect, useRef } from 'react';

interface Options<T = unknown> {
  fetchNextPage: () => Promise<T> | void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  threshold?: number;
}

export const useInfiniteScroll = <E extends HTMLElement, R = unknown>({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  threshold = 1.0,
}: Options<R>) => {
  const ref = useRef<E | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, threshold]);

  return ref;
};
