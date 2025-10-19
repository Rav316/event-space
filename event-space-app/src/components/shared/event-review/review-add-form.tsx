import { RequiredMark } from '@/components/ui';

export const ReviewAddForm = () => {
  return (
    <div
      className={'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5'}
    >
      <h3 className={'font-medium text-xl'}>Ваш отзыв о мероприятии</h3>
      <span className={'font-medium text-lg'}>
        Оценка <RequiredMark />
      </span>
    </div>
  );
};
