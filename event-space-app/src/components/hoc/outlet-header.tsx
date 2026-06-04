import { Header } from '@/components/shared';
import { Outlet, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { useEffect } from 'react';

const SITE_NAME = 'EventSpace';

const getPageTitle = (pathname: string): string => {
  const titles: Record<string, string> = {
    '/': 'Главная',
    '/register': 'Регистрация',
    '/events': 'Все мероприятия',
    '/my-events': 'Мои мероприятия',
    '/events/create': 'Создание мероприятия',
    '/profile': 'Профиль',
    '/my-registrations': 'Мои регистрации',
    '/statistics': 'Статистика',
    '/admin': 'Админ-панель',
    '/admin/directories': 'Справочники',
  };

  if (titles[pathname]) return titles[pathname];
  if (/^\/events\/[^/]+\/edit$/.test(pathname)) return 'Редактирование мероприятия';
  if (/^\/events\/[^/]+$/.test(pathname)) return 'Мероприятие';
  return '';
};

export const OutletHeader = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname);
    document.title = pageTitle ? `${pageTitle} — ${SITE_NAME}` : SITE_NAME;
  }, [location.pathname]);

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
