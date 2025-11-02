import { Calendar } from 'lucide-react';

export const NoFinishedEventsBlock = () => {
  return (
    <div
      className={
        'flex flex-col items-center gap-3 border border-[#E5E5E5] rounded-2xl p-5'
      }
    >
      <Calendar size={50} className={'text-muted-foreground'} />
      <div className={'flex flex-col items-center gap-1'}>
        <h3 className={'font-medium text-xl text-center'}>
          Нет завершённых мероприятий
        </h3>
        <span className={'text-muted-foreground text-center'}>
          Здесь появятся мероприятия, которые вы посетили
        </span>
      </div>
    </div>
  );
};
