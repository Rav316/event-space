import { Calendar } from 'lucide-react';

export const UserActivity = () => {
  return (
    <div className={'flex gap-3 items-start'}>
      <div className={'shrink-0 mt-1'}>
        <Calendar/>
      </div>
      <div className={'flex flex-col gap-0.5'}>
        <span className={'font-medium'}>Хакатон по машинному обучению</span>
        <span className={'text-muted-foreground text-sm'}>Создал новое мероприятие</span>
        <span className={'text-muted-foreground text-sm'}>20.02.2024 13:52</span>
      </div>
    </div>
  )
}