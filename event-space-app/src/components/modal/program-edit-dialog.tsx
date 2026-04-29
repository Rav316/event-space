import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
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
import { programEditSchema } from '@/schemas/program-edit-schema.ts';
import { useCheckProgramName, useEditProgram } from '@/api/programs/hooks.ts';
import { useEventCategories } from '@/api/event-categories/hooks.ts';
import type { ProgramEditDto } from '@/api/programs/model.ts';

interface Props {
  id: number;
  name: string;
  preferredCategoryIds: number[];
}

export const ProgramEditDialog = ({ id, name, preferredCategoryIds }: Props) => {
  const [open, setOpen] = useState(false);

  const { data: categories = [] } = useEventCategories();

  const form = useForm<ProgramEditDto>({
    resolver: zodResolver(programEditSchema),
    defaultValues: { name, preferredCategoryIds },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    if (open) {
      form.reset({ name, preferredCategoryIds });
    }
  }, [open, name, preferredCategoryIds, form]);

  const checkNameMutation = useCheckProgramName();
  const editMutation = useEditProgram();

  const onSubmit = form.handleSubmit(async (data) => {
    if (data.name !== name) {
      const nameExists = await checkNameMutation.mutateAsync(data.name);

      if (nameExists) {
        form.setError('name', {
          type: 'manual',
          message: 'Направление с таким названием уже существует',
        });
        return;
      }
    }

    await editMutation.mutateAsync({ id, data });
    setOpen(false);
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className={'h-8 w-8'}>
          <Pencil className={'w-4 h-4 text-muted-foreground'} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменить направление</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-name">Название</Label>
            <Input
              id="edit-name"
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
              onClick={() => setOpen(false)}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={editMutation.isPending || checkNameMutation.isPending}
            >
              {(editMutation.isPending || checkNameMutation.isPending) && (
                <Spinner />
              )}
              {editMutation.isPending ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
