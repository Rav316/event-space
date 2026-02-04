import { MessageSquareOff } from 'lucide-react';

export const NoMyReviewsBlock = () => {
  return (
    <div className={'h-full flex flex-col items-center gap-4 rounded-2xl p-8'}>
      <MessageSquareOff size={50} className="text-muted-foreground" />
      <div className={'flex flex-col items-center gap-1'}>
        <h1 className={'font-medium text-xl text-center'}>
          Вы пока не оставили ни одного отзыва
        </h1>
        <span className={'text-muted-foreground text-center'}>
          Посетите мероприятие и поделитесь своими впечатлениями
        </span>
      </div>
    </div>
  );
};
