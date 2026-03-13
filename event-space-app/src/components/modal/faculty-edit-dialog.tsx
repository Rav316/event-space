import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from '@/components/ui';
import { facultyEditSchema } from '@/schemas/faculty-edit-schema.ts';
import { useCheckFacultyName, useEditFaculty } from '@/api/faculties/hooks.ts';
import { useBuildings } from '@/api/buildings/hooks.ts';
import type { FacultyEditDto } from '@/api/faculties/model.ts';

interface Props {
  id: number;
  name: string;
  buildingName: string;
}

export const FacultyEditDialog = ({ id, name, buildingName }: Props) => {
  const [open, setOpen] = useState(false);

  const { data: buildings = [] } = useBuildings();

  const initialBuildingId = buildings.find((b) => b.name === buildingName)?.id;

  const form = useForm<FacultyEditDto>({
    resolver: zodResolver(facultyEditSchema),
    defaultValues: { name, building: initialBuildingId },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    if (open) {
      const buildingId = buildings.find((b) => b.name === buildingName)?.id;
      form.reset({ name, building: buildingId });
    }
  }, [open, name, buildingName, buildings, form]);

  const checkNameMutation = useCheckFacultyName();
  const editMutation = useEditFaculty();

  const onSubmit = form.handleSubmit(async (data) => {
    if (data.name !== name) {
      const nameExists = await checkNameMutation.mutateAsync(data.name);

      if (nameExists) {
        form.setError('name', {
          type: 'manual',
          message: 'Факультет с таким названием уже существует',
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
          <DialogTitle>Изменить факультет</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-name">Название</Label>
            <Input
              id="edit-name"
              placeholder="Факультет информационных технологий"
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
