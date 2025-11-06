import { AnimatePresence, motion } from 'framer-motion';
import { ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UseMutationResult } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuthModalStore } from '@/store/use-auth-modal-store.ts';
import { useMe } from '@/api/auth/hooks.ts';
import { cn } from '@/lib/utils.ts';

interface Props {
  reviewId: number;
  userMarkedHelpful: boolean;
  helpfulMarks: number;
  markAsHelpfulMutation: UseMutationResult<void, Error, number>;
  unmarkAsHelpfulMutation: UseMutationResult<void, Error, number>;
}

export const HelpfulButton: React.FC<Props> = ({
  reviewId,
  userMarkedHelpful,
  helpfulMarks,
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

    if (userMarkedHelpful) {
      unmarkAsHelpfulMutation.mutate(reviewId);
    } else {
      markAsHelpfulMutation.mutate(reviewId);
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
        key={userMarkedHelpful ? 'liked' : 'unliked'}
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <ThumbsUp
          className={cn(
            'transition-colors',
            userMarkedHelpful ? 'text-black' : 'text-muted-foreground'
          )}
        />
      </motion.div>

      <div className="flex items-center">
        <span>Полезно&nbsp;</span>
        <AnimatePresence mode="popLayout">
          {helpfulMarks > 0 && (
            <motion.span
              key={helpfulMarks}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="text-sm"
            >
              ({helpfulMarks})
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Button>
  );
};
