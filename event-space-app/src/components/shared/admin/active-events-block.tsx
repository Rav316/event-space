import { Progress, Separator } from '@/components/ui';

export const ActiveEventsBlock = () => {
  const events = [
    {
      title: 'Мастер-класс по веб-дизайну',
      eventDate: '2024-02-25',
      participantQuantity: 100,
      registeredUsers: 25,
      author: 'Иванов И. И.',
    },
    {
      title: 'Мастер-класс по веб-дизайну',
      eventDate: '2024-02-25',
      participantQuantity: 100,
      registeredUsers: 25,
      author: 'Иванов И. И.',
    },
    {
      title: 'Мастер-класс по веб-дизайну',
      eventDate: '2024-02-25',
      participantQuantity: 100,
      registeredUsers: 25,
      author: 'Иванов И. И.',
    },
  ];

  return (
    <div
      className={
        'border border-[#E5E5E5] rounded-2xl p-3 w-full flex flex-col gap-2'
      }
    >
      <span className={'font-medium'}>Активные мероприятия</span>
      <div className={'flex flex-col flex-1'}>
        {events.map((event, index) => (
          <div key={index} className={'flex flex-col'}>
            {index > 0 && <Separator />}
            <div className={'flex justify-between items-center py-2'}>
              <div className={'flex flex-col'}>
                <span>{event.title}</span>
                <span className={'text-muted-foreground text-xs'}>
                  {event.eventDate} · {event.author}
                </span>
              </div>
              <div className={'flex flex-col'}>
                {event.registeredUsers} / {event.participantQuantity}
                <Progress value={Math.max(0, (event.registeredUsers / event.participantQuantity) * 100)} className={'h-1'} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}