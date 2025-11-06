import { MessageSquareOff } from 'lucide-react';

export const NoReviewsBlock = () => {
  return (
    <div
      className={'h-full flex flex-col items-center gap-4 rounded-2xl p-5'}
    >
      <MessageSquareOff size={50}/>
      <div className={'flex flex-col items-center gap-1'}>
        <h1 className={'font-medium text-xl text-center'}>Пока нет отзывов</h1>
        <span className={'text-muted-foreground text-center'}>
        Станьте первым, кто поделится впечатлениями о мероприятии
      </span>
      </div>
    </div>
  );
};
