import { AnimatePresence, motion } from 'framer-motion';
import { ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { EventReviewReadDto } from '@/api/event-reviews/model.ts';
import type { UseMutationResult } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuthModalStore } from '@/store/use-auth-modal-store.ts';
import { useMe } from '@/api/auth/hooks.ts';

interface Props {
  review: EventReviewReadDto;
  markAsHelpfulMutation: UseMutationResult<void, Error, number, unknown>;
  unmarkAsHelpfulMutation: UseMutationResult<void, Error, number, unknown>;
}

export const HelpfulButton: React.FC<Props> = ({
  review,
  markAsHelpfulMutation,
  unmarkAsHelpfulMutation,
}) => {
  const [clickLocked, setClickLocked] = useState(false);
  const { data } = useMe();
  const setAuthModalOpen = useAuthModalStore((state) => state.setIsOpen);

  const handleClick = () => {
    if (!data) {
      setAuthModalOpen(true);
      return;
    }

    if (clickLocked) return;
    setClickLocked(true);
    setTimeout(() => setClickLocked(false), 300);

    if (review.userMarkedHelpful) {
      unmarkAsHelpfulMutation.mutate(review.id);
    } else {
      markAsHelpfulMutation.mutate(review.id);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      disabled={
        clickLocked ||
        markAsHelpfulMutation.isPending ||
        unmarkAsHelpfulMutation.isPending
      }
      className="flex items-center gap-2"
    >
      <motion.div
        key={review.userMarkedHelpful ? 'liked' : 'unliked'}
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <ThumbsUp
          className={
            review.userMarkedHelpful
              ? 'text-black fill-black'
              : 'text-muted-foreground'
          }
        />
      </motion.div>

      <div className="flex items-center">
        <span>Полезно&nbsp;</span>
        <AnimatePresence mode="popLayout">
          {review.helpfulMarks > 0 && (
            <motion.span
              key={review.helpfulMarks}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="text-sm"
            >
              ({review.helpfulMarks})
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Button>
  );
};
