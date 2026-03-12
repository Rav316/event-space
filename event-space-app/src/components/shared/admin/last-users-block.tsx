import { UserAvatar } from '@/components/shared';
import { Badge, Separator } from '@/components/ui';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminStatistics } from '@/api/admin/hooks.ts';

export const LastUsersBlock = () => {
  const { data: statistics, isPending } = useAdminStatistics();

  return (
    <div className={'border border-[#E5E5E5] rounded-2xl p-3 w-full flex flex-col gap-2'}>
      <span className={'font-medium'}>Последние пользователи</span>
      <div className={'flex flex-col flex-1'}>
        {isPending ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={'flex flex-col'}>
              {index > 0 && <Separator />}
              <div className={'flex justify-between items-center py-2'}>
                <Skeleton className={'h-8 w-40 rounded-md'} />
                <Skeleton className={'h-6 w-16 rounded-full'} />
              </div>
            </div>
          ))
        ) : (
          statistics?.latestUsers?.map((user, index) => (
            <div key={user.id} className={'flex flex-col'}>
              {index > 0 && <Separator />}
              <div className={'flex justify-between items-center py-2'}>
                <div className={'flex gap-2 items-center'}>
                  <UserAvatar
                    firstName={user.firstName}
                    lastName={user.lastName}
                    avatarUrl={user.avatarUrl}
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <Badge variant={'outline'}>{user.active ? 'Активен' : 'Неактивен'}</Badge>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}