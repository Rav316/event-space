import { Header } from '@/components/shared';
import { Outlet } from 'react-router';

export const OutletHeader = () => {
  return (
    <>
      <div className={'sticky top-0 w-full bg-white/70 backdrop-blur-lg z-40'}>
        <Header />
      </div>
      <Outlet />
    </>
  );
};
