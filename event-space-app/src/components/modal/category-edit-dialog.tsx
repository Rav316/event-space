import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormErrorMessage,
  Input,
  Label,
  Spinner,
} from '@/components/ui';
import { categoryEditSchema } from '@/schemas/category-edit-schema.ts';
import { useCheckCategoryName, useEditCategory } from '@/api/event-categories/hooks.ts';
import type { EventCategoryEditDto } from '@/api/event-categories/model.ts';
import { z } from 'zod';

type CategoryEditForm = z.infer<typeof categoryEditSchema>;

interface Props {
  id: number;
  name: string;
}

export const CategoryEditDialog = ({ id, name }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<CategoryEditForm>({
    resolver: zodResolver(categoryEditSchema),
    defaultValues: { name },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    if (open) {
      form.reset({ name });
    }
  }, [open, name, form]);

  const checkNameMutation = useCheckCategoryName();
  const editMutation = useEditCategory();

  const onSubmit = form.handleSubmit(async (data) => {
    if (data.name !== name) {
      const nameExists = await checkNameMutation.mutateAsync(data.name);

      if (nameExists) {
        form.setError('name', {
          type: 'manual',
          message: 'Категория с таким названием уже существует',
        });
        return;
      }
    }

    const dto: EventCategoryEditDto = { name: data.name };
    await editMutation.mutateAsync({ id, data: dto });
    setOpen(false);
  });

  return (
    <Dialog open={open} onOpenChange={(value) => { setOpen(value); }}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className={'h-8 w-8'}>
          <Pencil className={'w-4 h-4 text-muted-foreground'} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменить категорию</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-name">Название</Label>
            <Input
              id="edit-name"
              placeholder="Наука и технологии"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <FormErrorMessage>{form.formState.errors.name.message}</FormErrorMessage>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={editMutation.isPending || checkNameMutation.isPending}>
              {(editMutation.isPending || checkNameMutation.isPending) && <Spinner />}
              {editMutation.isPending ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
