import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
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
import { categoryCreateSchema } from '@/schemas/category-create-schema.ts';
import { useCheckCategoryName, useCreateCategory } from '@/api/event-categories/hooks.ts';
import type { EventCategoryCreateDto } from '@/api/event-categories/model.ts';

export const CategoryCreateDialog = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<EventCategoryCreateDto>({
    resolver: zodResolver(categoryCreateSchema),
    defaultValues: { name: '' },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const checkNameMutation = useCheckCategoryName();
  const createMutation = useCreateCategory();

  const onSubmit = form.handleSubmit(async (data) => {
    const nameExists = await checkNameMutation.mutateAsync(data.name);

    if (nameExists) {
      form.setError('name', {
        type: 'manual',
        message: 'Категория с таким названием уже существует',
      });
      return;
    }

    await createMutation.mutateAsync(data);
    setOpen(false);
    form.reset();
  });

  return (
    <Dialog open={open} onOpenChange={(value) => { setOpen(value); form.reset(); }}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Добавить категорию</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить категорию</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Название</Label>
            <Input
              id="name"
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
              onClick={() => { setOpen(false); form.reset(); }}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={createMutation.isPending || checkNameMutation.isPending}>
              {(createMutation.isPending || checkNameMutation.isPending) && <Spinner />}
              {createMutation.isPending ? 'Сохранение...' : 'Добавить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
