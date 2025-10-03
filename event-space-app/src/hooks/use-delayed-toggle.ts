import { useState, useRef, useEffect, useCallback } from 'react';

interface UseDelayedToggleOptions {
  selected: boolean;
  onCommit: (next: boolean) => void;
  delay?: number;
}

export const useDelayedToggle = ({
  selected,
  onCommit,
  delay = 300,
}: UseDelayedToggleOptions) => {
  const [localSelected, setLocalSelected] = useState<boolean>(selected);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!timerRef.current) {
      setLocalSelected(selected);
    }
  }, [selected]);

  const commit = useCallback(
    (next: boolean) => {
      timerRef.current = null;
      if (next !== selected) {
        onCommit(next);
      }
    },
    [selected, onCommit],
  );

  const toggle = useCallback(() => {
    setLocalSelected((prev) => {
      const next = !prev;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => commit(next), delay);
      return next;
    });
  }, [commit, delay]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return { localSelected, toggle };
};
