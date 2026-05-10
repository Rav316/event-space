import { useEffect, useRef, useState } from 'react';
import { useIsFetching } from '@tanstack/react-query';

export const TopProgressBar = () => {
  const isFetching = useIsFetching();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isFetching > 0) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);

      setVisible(true);

      if (!intervalRef.current) {
        setWidth(8);
        intervalRef.current = setInterval(() => {
          setWidth((prev) => {
            if (prev >= 82) return prev;
            return prev + (82 - prev) * 0.08 + 0.5;
          });
        }, 150);
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      setWidth(100);

      completeTimerRef.current = setTimeout(() => {
        hideTimerRef.current = setTimeout(() => {
          setVisible(false);
          setWidth(0);
        }, 250);
      }, 150);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, [isFetching]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] h-[2px] pointer-events-none">
      <div
        className="h-full bg-foreground"
        style={{
          width: `${width}%`,
          transition:
            width === 100
              ? 'width 0.15s ease-out'
              : 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  );
};
