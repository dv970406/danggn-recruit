import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";

interface IInfiniteScrolling {
  children: React.ReactNode;
  hasNextPage?: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<any, unknown>>;
}
const InfiniteScrolling = ({
  children,
  fetchNextPage,
  hasNextPage,
}: IInfiniteScrolling) => {
  const observeElement = useRef<HTMLDivElement>(null);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observeElement.current!;
    const option = { threshold: 0.1 };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return (
    <div>
      {children}
      <div ref={observeElement} />
    </div>
  );
};

export default InfiniteScrolling;
