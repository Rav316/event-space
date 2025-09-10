import { Calendar, ChartColumn, History, Plus, Users } from 'lucide-react';
import { HeaderItem } from '@/components/ui/header-item.tsx';
import { SearchInput } from '@/components/ui/search-input.tsx';
import { Button } from '@/components/ui';
import { ProfileMenu } from '@/components/shared/profile-menu.tsx';
import { NavigationMenu } from '@/components/shared/navigation-menu.tsx';

export const Header = () => {
  return (
    <header
      className={
        'flex justify-center items-center py-[20px] px-[20px] border-b border-gray-400'
      }
    >
      <div
        className={
          'flex items-center  w-full max-w-[1720px] justify-between gap-4'
        }
      >
        <div className={'flex items-center gap-2'}>
          <Calendar width={40} height={40} />
          <h1 className={'text-3xl font-medium max-[800px]:hidden'}>EventSpace</h1>
        </div>
        <div className={'flex items-center gap-x-4 max-[1200px]:hidden'}>
          <HeaderItem Icon={Calendar} text={'Мероприятия'} />
          <HeaderItem Icon={Users} text={'Мои регистрации'} />
          <HeaderItem Icon={ChartColumn} text={'Статистика'} />
          <HeaderItem Icon={History} text={'История'} />
        </div>
        <div className={'w-[400px]'}>
          <div className="relative w-full max-w-sm">
            <SearchInput />
          </div>
        </div>
        <div className={'flex gap-x-3 items-center'}>
          <Button className={'h-[30px]'}>
            <Plus />
            <span className={'max-[500px]:hidden'}>Создать</span>
          </Button>
          <ProfileMenu/>
          <NavigationMenu className={'hidden max-[1200px]:block'}/>
        </div>
      </div>
    </header>
  );
};
