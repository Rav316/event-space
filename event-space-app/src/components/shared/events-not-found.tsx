import { Search } from 'lucide-react';

export const EventsNotFound = () => {
  return (
    <div className="w-full border border-[#E5E5E5] rounded-2xl p-5 flex flex-col items-center gap-4 py-10">
      <Search width={50} height={50} className={'text-muted-foreground'}/>
      <div className={'flex flex-col items-center gap-2'}>
        <h3 className={'font-medium text-xl text-center'}>Мероприятия не найдены</h3>
        <span className={'text-muted-foreground text-center'}>Попробуйте изменить параметры поиска или фильтры</span>
      </div>
    </div>
  );
}