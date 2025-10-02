import {
  Badge,
  Button,
  FormErrorMessage,
  Input,
  Label,
  RequiredMark,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Textarea,
} from '@/components/ui';
import { Hash } from 'lucide-react';
import { useTags } from '@/hooks/use-tags.ts';
import { useEventCategories } from '@/api/event-categories/hooks.ts';
import { FormProvider, useForm } from 'react-hook-form';
import type { EventMainInfo } from '@/schemas/event-main-info-schema.ts';
import React from 'react';

interface Props {
  form: ReturnType<typeof useForm<EventMainInfo>>;
}

export const MainInfoStep: React.FC<Props> = ({ form }) => {
  const shortDescriptionLength = 130;
  const descriptionLength = 1000;

  const shortDescValue = form.watch('shortDescription') || '';
  const descValue = form.watch('description') || '';

  const { tags, setNewTag, removeTag, onInputTagEnterPress, newTag, addTag } =
    useTags(form);

  const { data, isPending } = useEventCategories();

  return (
    <FormProvider {...form}>
      <form className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-2'}>
          <Label htmlFor={'name'}>
            Название мероприятия <RequiredMark />
          </Label>
          <Input
            id={'name'}
            placeholder={'Введите названия мероприятия'}
            maxLength={128}
            {...form.register('name')}
          />
          {form.formState.errors.name && (
            <FormErrorMessage>
              {form.formState.errors.name.message}
            </FormErrorMessage>
          )}
        </div>
        <div className={'flex flex-col gap-2'}>
          <Label htmlFor={'short-description'}>
            Краткое описание <RequiredMark />
          </Label>
          <div className={'flex flex-col gap-1'}>
            <Textarea
              className={'resize-none'}
              id={'short-description'}
              placeholder={'Краткое описание для карточки мероприятия'}
              maxLength={shortDescriptionLength}
              {...form.register('shortDescription')}
            />
            <span className={'text-xs text-muted-foreground'}>
              {shortDescValue.length}/{shortDescriptionLength}
            </span>
            {form.formState.errors.shortDescription && (
              <FormErrorMessage>
                {form.formState.errors.shortDescription.message}
              </FormErrorMessage>
            )}
          </div>
        </div>
        <div className={'flex flex-col gap-2'}>
          <Label htmlFor={'description'}>Подробное описание</Label>
          <div className={'flex flex-col gap-1'}>
            <Textarea
              className={'resize-none'}
              id={'description'}
              placeholder={'Подробное описание для карточки мероприятия'}
              maxLength={descriptionLength}
              {...form.register('description')}
            />
            <span className={'text-xs text-muted-foreground'}>
              {descValue.length}/{descriptionLength}
            </span>
            {form.formState.errors.description && (
              <FormErrorMessage>
                {form.formState.errors.description.message}
              </FormErrorMessage>
            )}
          </div>
        </div>
        <div className="flex max-[600px]:flex-col justify-between gap-4">
          <div className="flex flex-col gap-2 w-1/2 max-[600px]:w-full">
            <Label htmlFor="category">
              Категория <RequiredMark />
            </Label>
            {isPending ? (
              <Skeleton className={'w-full h-8'} />
            ) : (
              <>
                <Select
                  value={
                    form.watch('category')?.toString() === '0'
                      ? undefined
                      : form.watch('category')?.toString()
                  }
                  onValueChange={(value) =>
                    form.setValue('category', Number(value))
                  }
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <FormErrorMessage>
                    {form.formState.errors.category.message}
                  </FormErrorMessage>
                )}
              </>
            )}
          </div>
          <div className={'flex flex-1 flex-col gap-2'}>
            <Label htmlFor={'tags'}>Теги мероприятия</Label>
            <div className={'flex gap-x-2'}>
              <Input
                id={'tags'}
                placeholder={'Добавить тег'}
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={onInputTagEnterPress}
                maxLength={10}
              />
              <Button type={'button'} variant={'outline'} onClick={addTag}>
                <Hash />
              </Button>
            </div>
            <div className={'flex flex-wrap gap-2'}>
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant={'secondary'}
                  className={'cursor-pointer'}
                  onClick={() => removeTag(tag)}
                >
                  {tag} x
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
