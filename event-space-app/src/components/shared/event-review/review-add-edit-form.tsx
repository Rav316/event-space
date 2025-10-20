import {
  Button,
  FormErrorMessage,
  Input,
  Label,
  RequiredMark,
  Spinner,
  Textarea,
} from '@/components/ui';
import { ReviewRatingInput } from '@/components/shared/event-review/review-rating-input.tsx';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import type { EventReviewCreateEditDto } from '@/api/event-reviews/model.ts';

interface Props {
  onSubmit: (data: EventReviewCreateEditDto) => void;
  onCancel: () => void;
  isPending?: boolean;
  form: ReturnType<typeof useForm<EventReviewCreateEditDto>>;
  isEdit?: boolean;
}

export const ReviewAddEditForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  isPending,
  form,
  isEdit,
}) => {
  return (
    <FormProvider {...form}>
      <form
        className={
          'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5 max-[410px]:p-3'
        }
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h3 className={'font-medium text-xl'}>Ваш отзыв о мероприятии</h3>
        <span>
          Оценка <RequiredMark />
          <div className={'flex flex-col gap-1'}>
            <Controller
              name="rating"
              control={form.control}
              render={({ field }) => (
                <ReviewRatingInput
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {form.formState.errors.rating && (
              <FormErrorMessage>
                {form.formState.errors.rating.message}
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
            {...form.register('title')}
          />
          {form.formState.errors.title && (
            <FormErrorMessage>
              {form.formState.errors.title.message}
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
            {...form.register('content')}
          />
          {form.formState.errors.content && (
            <FormErrorMessage>
              {form.formState.errors.content.message}
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
              <span>{isEdit ? 'Изменить' : 'Опубликовать'}</span>
            ) : (
              <div className={'flex items-center gap-2'}>
                <span>Публикация...</span>
                <Spinner />
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
