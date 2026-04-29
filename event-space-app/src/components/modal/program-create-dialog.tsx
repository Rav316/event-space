import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import {
  Button,
  Checkbox,
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
import { programCreateSchema } from '@/schemas/program-create-schema.ts';
import {
  useCheckProgramName,
  useCreateProgram,
} from '@/api/programs/hooks.ts';
import { useEventCategories } from '@/api/event-categories/hooks.ts';
import type { ProgramCreateDto } from '@/api/programs/model.ts';

export const ProgramCreateDialog = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<ProgramCreateDto>({
    resolver: zodResolver(programCreateSchema),
    defaultValues: { name: '', preferredCategoryIds: [] },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { data: categories = [] } = useEventCategories();
  const checkNameMutation = useCheckProgramName();
  const createMutation = useCreateProgram();

  const onSubmit = form.handleSubmit(async (data) => {
    const nameExists = await checkNameMutation.mutateAsync(data.name);

    if (nameExists) {
      form.setError('name', {
        type: 'manual',
        message: 'Направление с таким названием уже существует',
      });
      return;
    }

    await createMutation.mutateAsync(data);
    setOpen(false);
    form.reset();
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Добавить направление</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить направление</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Название</Label>
            <Input
              id="name"
              placeholder="Направление информационных технологий"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <FormErrorMessage>
                {form.formState.errors.name.message}
              </FormErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Рекомендуемые категории мероприятий</Label>
            <Controller
              control={form.control}
              name="preferredCategoryIds"
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => {
                    const checked = field.value?.includes(category.id) ?? false;
                    return (
                      <label
                        key={category.id}
                        className="flex items-center gap-2 cursor-pointer select-none"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(value) => {
                            const next = value
                              ? [...(field.value ?? []), category.id]
                              : (field.value ?? []).filter((id) => id !== category.id);
                            field.onChange(next);
                          }}
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm">{category.name}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                form.reset();
              }}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || checkNameMutation.isPending}
            >
              {(createMutation.isPending || checkNameMutation.isPending) && (
                <Spinner />
              )}
              {createMutation.isPending ? 'Сохранение...' : 'Добавить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
