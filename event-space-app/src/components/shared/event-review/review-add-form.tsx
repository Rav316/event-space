import { Button, Input, Label, RequiredMark } from '@/components/ui';
import { ReviewRatingInput } from '@/components/shared/event-review/review-rating-input.tsx';

export const ReviewAddForm = () => {
  return (
    <form
      className={'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5 max-[410px]:p-3'}
    >
      <h3 className={'font-medium text-xl'}>Ваш отзыв о мероприятии</h3>
      <span>
        Оценка <RequiredMark />
        <ReviewRatingInput/>
      </span>
      <div className={'flex flex-col gap-1'}>
        <Label>
          Заголовок отзыва <RequiredMark />
        </Label>
        <Input placeholder={'Краткое описание впечатлений'}/>
      </div>
      <div className={'flex flex-col gap-1'}>
        <Label>
          Подробный отзыв <RequiredMark />
        </Label>
        <Input placeholder={'Поделитесь подробностями'}/>
      </div>
      <div className={'flex gap-2 items-center'}>
        <Button type={'submit'} className={'max-[500px]:flex-1'}>
          <span>Опубликовать отзыв</span>
        </Button>
        <Button variant={'outline'} className={'max-[500px]:flex-1'}>
          <span>Отмена</span>
        </Button>
      </div>
    </form>
  );
};
