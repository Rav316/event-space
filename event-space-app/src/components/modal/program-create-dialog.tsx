import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from '@/components/ui';
import { programCreateSchema } from '@/schemas/program-create-schema.ts';
import {
  useCheckProgramName,
  useCreateProgram,
} from '@/api/programs/hooks.ts';
import { useBuildings } from '@/api/buildings/hooks.ts';
import type { ProgramCreateDto } from '@/api/programs/model.ts';

export const ProgramCreateDialog = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<ProgramCreateDto>({
    resolver: zodResolver(programCreateSchema),
    defaultValues: { name: '', building: undefined },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { data: buildings = [] } = useBuildings();
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
            <Label>Корпус</Label>
            <Controller
              control={form.control}
              name="building"
              render={({ field }) => (
                <Select
                  value={field.value !== undefined ? String(field.value) : ''}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите корпус" />
                  </SelectTrigger>
                  <SelectContent>
                    {buildings.map((b) => (
                      <SelectItem key={b.id} value={String(b.id)}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.building && (
              <FormErrorMessage>
                {form.formState.errors.building.message}
              </FormErrorMessage>
            )}
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
