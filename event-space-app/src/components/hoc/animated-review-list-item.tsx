import React, { type PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

export const AnimatedReviewListItem: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
