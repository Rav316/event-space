import { AdminStatisticsBlock } from '@/components/shared/admin/admin-statistics-block.tsx';
import { FolderTree } from 'lucide-react';
import { Button } from '@/components/ui';
import { LastUsersBlock } from '@/components/shared/admin/last-users-block.tsx';
import { ActiveEventsBlock } from '@/components/shared/admin/active-events-block.tsx';
import { Link } from 'react-router';

export const AdminReviewTab = () => {
  return (
    <div className={'flex flex-col gap-2'}>
      <AdminStatisticsBlock />
      <div className={'border flex rounded-2xl border-[#E5E5E5] p-3'}>
        <div
          className={
            'flex gap-4 justify-between items-center w-full max-[750px]:flex-col max-[750px]:items-start'
          }
        >
          <div className={'flex gap-4'}>
            <div
              className={
                'rounded-full w-11 h-11 bg-[#E5E5E5] flex items-center justify-center shrink-0 max-[530px]:hidden'
              }
            >
              <FolderTree />
            </div>
            <div className={'flex flex-col'}>
              <span className={'font-medium'}>Управление справочниками</span>
              <span className={'text-muted-foreground text-sm'}>
                Настройте локации, кабинеты, категории, факультеты и теги
              </span>
            </div>
          </div>
          <Link to={'/admin/directories'}>
            <Button>
              <FolderTree />
              <span>Открыть справочники</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className={'flex w-full gap-2 max-[710px]:flex-col'}>
        <LastUsersBlock />
        <ActiveEventsBlock />
      </div>
    </div>
  );
};
