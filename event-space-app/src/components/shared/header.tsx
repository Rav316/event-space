import { Calendar, ChartColumn, History, Plus, Users } from 'lucide-react';
import {
  HeaderItem,
  NavigationMenu,
  ProfileMenu,
  SearchInput,
} from '@/components/shared';
import { Button, Skeleton } from '@/components/ui';
import { Link } from 'react-router';
import { useMe } from '@/api/auth/hooks.ts';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/use-auth-store.ts';
import { useAuthModalStore } from '@/store/use-auth-modal-store.ts';

export const Header = () => {
  const { data, isFetching, isSuccess } = useMe();
  const setToken = useAuthStore((state) => state.setToken);
  const openModal = useAuthModalStore((state) => state.setIsOpen);

  useEffect(() => {
    if (isSuccess && data) {
      setToken(data.accessToken);
    }
  }, [data, isSuccess, setToken]);

  return (
    <header
      className={
        'flex justify-center items-center py-[20px] px-[20px] border-b border-[#E5E5E5]'
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
            <h1 className={'text-3xl font-medium max-[800px]:hidden'}>
              EventSpace
            </h1>
          </div>
        </Link>
        <div
          className={
            'flex items-center gap-x-4 max-[1350px]:hidden min-w-[500px]'
          }
        >
          <Link to={'/events'}>
            <HeaderItem Icon={Calendar} text={'Мероприятия'} />
          </Link>
          {data && (
            <>
              <HeaderItem Icon={Users} text={'Мои регистрации'} />
              <HeaderItem Icon={ChartColumn} text={'Статистика'} />
              <HeaderItem Icon={History} text={'История'} />
            </>
          )}
        </div>
        <div className={'w-[400px]'}>
          <div className="relative w-full max-w-sm">
            <SearchInput placeholder={'Поиск...'} value={''} />
          </div>
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
                    <span className={'max-[500px]:hidden'}>Создать</span>
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
