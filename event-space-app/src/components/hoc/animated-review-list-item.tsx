import React, { type PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

interface Props {
  key: number;
}

export const AnimatedReviewListItem: React.FC<PropsWithChildren<Props>> = ({
  key,
  children,
}) => {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
