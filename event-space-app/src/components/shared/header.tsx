import { Calendar, ChartColumn, History, Plus, Users } from 'lucide-react';
import { HeaderItem } from '@/components/shared/header-item.tsx';
import { SearchInput } from '@/components/shared/search-input.tsx';
import { Button } from '@/components/ui';
import { ProfileMenu } from '@/components/shared/profile-menu.tsx';
import { NavigationMenu } from '@/components/shared/navigation-menu.tsx';
import { Link } from 'react-router';
import { LoginModal } from '@/components/modal';
import { useMe } from '@/api/auth/hooks.ts';

export const Header = () => {

  const {data, isFetching} = useMe();

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
        <div className={'flex items-center gap-x-4 max-[1200px]:hidden'}>
          <Link to={'/events'}>
            <HeaderItem Icon={Calendar} text={'Мероприятия'} />
          </Link>
          <HeaderItem Icon={Users} text={'Мои регистрации'} />
          <HeaderItem Icon={ChartColumn} text={'Статистика'} />
          <HeaderItem Icon={History} text={'История'} />
        </div>
        <div className={'w-[400px]'}>
          <div className="relative w-full max-w-sm">
            <SearchInput placeholder={'Поиск...'} />
          </div>
        </div>
        {!isFetching && !data ? (
          <LoginModal/>
        ) : (
          <div className={'flex gap-x-3 items-center'}>
            <Button className={'h-[30px]'}>
              <Plus />
              <span className={'max-[500px]:hidden'}>Создать</span>
            </Button>
            <ProfileMenu />
            <NavigationMenu className={'hidden max-[1200px]:block'} />
          </div>
        )}
      </div>
    </header>
  );
};
