import { Progress, Separator } from '@/components/ui';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminStatistics } from '@/api/admin/hooks.ts';

export const ActiveEventsBlock = () => {
  const { data: statistics, isPending } = useAdminStatistics();

  return (
    <div
      className={
        'border border-[#E8E8E8] rounded-2xl p-3 w-full flex flex-col gap-2'
      }
    >
      <span className={'font-medium'}>Активные мероприятия</span>
      <div className={'flex flex-col flex-1'}>
        {isPending ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={'flex flex-col'}>
              {index > 0 && <Separator />}
              <div className={'flex justify-between items-center py-2'}>
                <Skeleton className={'h-8 w-40 rounded-md'} />
                <Skeleton className={'h-6 w-20 rounded-md'} />
              </div>
            </div>
          ))
        ) : !statistics?.latestActiveEvents?.length ? (
          <div className={'flex flex-1 items-center justify-center py-6'}>
            <span className={'text-muted-foreground text-sm'}>
              Нет активных мероприятий
            </span>
          </div>
        ) : (
          statistics.latestActiveEvents.map((event, index) => (
            <div key={event.id} className={'flex flex-col'}>
              {index > 0 && <Separator />}
              <div className={'flex justify-between items-center py-2'}>
                <div className={'flex flex-col'}>
                  <span>{event.name}</span>
                  <span className={'text-muted-foreground text-xs'}>
                    {event.eventDate} · {event.authorFirstName}{' '}
                    {event.authorLastName}
                  </span>
                </div>
                <div className={'flex flex-col items-end gap-1 shrink-0'}>
                  <span className={'text-sm text-muted-foreground'}>
                    {event.registeredUsers} / {event.participantQuantity}
                  </span>
                  <Progress
                    value={Math.max(
                      0,
                      (event.registeredUsers / event.participantQuantity) * 100,
                    )}
                    className={'h-1.5 w-24'}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
