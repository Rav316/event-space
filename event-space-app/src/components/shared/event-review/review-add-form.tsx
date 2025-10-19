import {
  Button,
  FormErrorMessage,
  Input,
  Label,
  RequiredMark, Spinner, Textarea
} from '@/components/ui';
import { ReviewRatingInput } from '@/components/shared/event-review/review-rating-input.tsx';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import type { EventReviewCreateDto } from '@/api/event-reviews/model.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewAddSchema } from '@/schemas/review-add-schema.ts';

interface Props {
  onSubmit: (data: EventReviewCreateDto) => void;
  onCancel: () => void;
  isPending?: boolean;
}

export const ReviewAddForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  isPending
}) => {
  const reviewAddForm = useForm<EventReviewCreateDto>({
    resolver: zodResolver(reviewAddSchema),
    defaultValues: {
      rating: 0,
      title: '',
      content: '',
    },
  });

  return (
    <FormProvider {...reviewAddForm}>
      <form
        className={
          'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5 max-[410px]:p-3'
        }
        onSubmit={reviewAddForm.handleSubmit(onSubmit)}
      >
        <h3 className={'font-medium text-xl'}>Ваш отзыв о мероприятии</h3>
        <span>
          Оценка <RequiredMark />
          <div className={'flex flex-col gap-1'}>
            <Controller
              name="rating"
              control={reviewAddForm.control}
              render={({ field }) => (
                <ReviewRatingInput
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {reviewAddForm.formState.errors.rating && (
              <FormErrorMessage>
                {reviewAddForm.formState.errors.rating.message}
              </FormErrorMessage>
            )}
          </div>
        </span>
        <div className={'flex flex-col gap-1'}>
          <Label>
            Заголовок отзыва <RequiredMark />
          </Label>
          <Input
            placeholder={'Краткое описание впечатлений'}
            {...reviewAddForm.register('title')}
          />
          {reviewAddForm.formState.errors.title && (
            <FormErrorMessage>
              {reviewAddForm.formState.errors.title.message}
            </FormErrorMessage>
          )}
        </div>
        <div className={'flex flex-col gap-1'}>
          <Label>
            Подробный отзыв <RequiredMark />
          </Label>
          <Textarea
            className={'resize-none'}
            placeholder={'Поделитесь подробностями'}
            {...reviewAddForm.register('content')}
          />
          {reviewAddForm.formState.errors.content && (
            <FormErrorMessage>
              {reviewAddForm.formState.errors.content.message}
            </FormErrorMessage>
          )}
        </div>
        <div className={'flex gap-2 items-center'}>
          <Button
            disabled={isPending}
            type={'submit'}
            className={'max-[500px]:flex-1'}
          >
            {!isPending ? (
              <span>Опубликовать отзыв</span>
            ) : (
              <div className={'flex items-center gap-2'}>
                <span>Публикация...</span>
                <Spinner/>
              </div>
            )}
          </Button>
          <Button
            disabled={isPending}
            onClick={onCancel}
            variant={'outline'}
            className={'max-[500px]:flex-1'}
          >
            <span>Отмена</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
