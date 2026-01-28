import { Briefcase, Calendar, ChartColumn, Plus, Users } from 'lucide-react';
import { HeaderItem, NavigationMenu, ProfileMenu } from '@/components/shared';
import { Button, Skeleton } from '@/components/ui';
import { Link, NavLink } from 'react-router';
import { useMe } from '@/api/auth/hooks.ts';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/use-auth-store.ts';
import { useAuthModalStore } from '@/store/use-auth-modal-store.ts';

export const Header = () => {
  const { data, isFetching, isSuccess } = useMe();
  const setTokens = useAuthStore((state) => state.setTokens);
  const openModal = useAuthModalStore((state) => state.setIsOpen);

  useEffect(() => {
    if (isSuccess && data) {
      setTokens(data.accessToken, data.refreshToken);
    }
  }, [data, isSuccess, setTokens]);

  return (
    <header
      className={
        'flex justify-center items-center py-5 px-5 border-b border-[#E5E5E5]'
      }
    >
      <div
        className={
          'flex items-center  w-full max-w-[1720px] justify-between gap-4'
        }
      >
        <Link to={'/'}>
          <div className={'flex items-center gap-2'}>
            <Calendar width={40} height={40} />
            <h1 className={'text-3xl font-medium max-[520px]:hidden'}>
              EventSpace
            </h1>
          </div>
        </Link>
        <div
          className={
            'flex items-center gap-x-4 max-[1350px]:hidden min-w-[500px]'
          }
        >
          {data && (
            <>
              <NavLink to={'/events'}>
                {({ isActive }) => (
                  <HeaderItem
                    Icon={Calendar}
                    text={'Все мероприятия'}
                    isActive={isActive}
                  />
                )}
              </NavLink>
              <NavLink to={'/my-events'}>
                {({ isActive }) => (
                  <HeaderItem
                    Icon={Briefcase}
                    text={'Мои мероприятия'}
                    isActive={isActive}
                  />
                )}
              </NavLink>
              <NavLink to={'/my-registrations'}>
                {({ isActive }) => (
                  <HeaderItem
                    Icon={Users}
                    text={'Мои регистрации'}
                    isActive={isActive}
                  />
                )}
              </NavLink>
              <NavLink to={'/statistics'}>
                {({ isActive }) => (
                  <HeaderItem
                    Icon={ChartColumn}
                    text={'Статистика'}
                    isActive={isActive}
                  />
                )}
              </NavLink>
            </>
          )}
        </div>
        {!isFetching && !data ? (
          <Button onClick={() => openModal(true)}>
            <span>Войти</span>
          </Button>
        ) : (
          <div className={'flex gap-x-3 items-center'}>
            {isFetching ? (
              <div className={'flex gap-x-3 items-center'}>
                <Skeleton className={'h-[30px] w-[103px]'} />
                <Skeleton className={'rounded-full h-[30px] w-[30px]'} />
                <Skeleton
                  className={'hidden max-[1350px]:block h-[30px] w-[35px]'}
                />
              </div>
            ) : (
              <>
                <Link to={'/events/create'}>
                  <Button className={'h-[30px]'}>
                    <Plus />
                    <span className={'max-[320px]:hidden'}>Создать</span>
                  </Button>
                </Link>
                <ProfileMenu />
                <NavigationMenu className={'hidden max-[1350px]:block'} />
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
