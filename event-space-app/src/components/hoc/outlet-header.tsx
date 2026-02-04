import { Header } from '@/components/shared';
import { Outlet, useLocation } from 'react-router';
import { motion } from 'motion/react';

export const OutletHeader = () => {
  const location = useLocation();

  return (
    <>
      <div className={'sticky top-0 w-full bg-white/70 backdrop-blur-lg z-40'}>
        <Header />
      </div>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.div>
    </>
  );
};
