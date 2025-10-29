import { ReviewStatItem } from '@/components/shared/event-review';

export const LastReviewsList = () => {
  return (
    <div className={'flex flex-col gap-5 w-full border border-[#E5E5E5] rounded-2xl p-5'}>
      <span className={'font-medium text-xl'}>Мои последние отзывы</span>
      <ReviewStatItem/>
      <ReviewStatItem/>
      <ReviewStatItem/>
    </div>
  )
}