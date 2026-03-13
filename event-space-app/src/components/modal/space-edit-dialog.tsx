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
import { type SpaceEditFormData, spaceEditSchema } from '@/schemas/space-edit-schema.ts';
import { useCheckSpaceNameAndBuilding, useEditSpace, useSpaceTypes } from '@/api/spaces/hooks.ts';
import { useBuildings } from '@/api/buildings/hooks.ts';
import type { SpaceEditDto } from '@/api/spaces/model.ts';

interface Props {
  id: number;
  name: string;
  buildingId: number;
  typeId: number;
  floor: number | null;
  capacity: number;
}

export const SpaceEditDialog = ({ id, name, buildingId, typeId, floor, capacity }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<SpaceEditFormData>({
    resolver: zodResolver(spaceEditSchema),
    defaultValues: { name, building: buildingId, type: typeId, floor: floor ?? null, capacity },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    if (open) {
      form.reset({ name, building: buildingId, type: typeId, floor: floor ?? null, capacity });
    }
  }, [open, name, buildingId, typeId, floor, capacity, form]);

  const { data: buildings = [] } = useBuildings();
  const { data: spaceTypes = [] } = useSpaceTypes();
  const checkNameMutation = useCheckSpaceNameAndBuilding();
  const editMutation = useEditSpace();

  const onSubmit = form.handleSubmit(async (data) => {
    if (data.name !== name || data.building !== buildingId) {
      const nameExists = await checkNameMutation.mutateAsync({ name: data.name, building: data.building });

      if (nameExists) {
        form.setError('name', {
          type: 'manual',
          message: 'Пространство с таким названием уже существует в этой локации',
        });
        return;
      }
    }

    const dto: SpaceEditDto = {
      name: data.name,
      building: data.building,
      type: data.type,
      floor: data.floor ?? null,
      capacity: data.capacity,
    };
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
          <DialogTitle>Изменить пространство</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-space-name">Название</Label>
            <Input
              id="edit-space-name"
              placeholder="Аудитория 101"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <FormErrorMessage>{form.formState.errors.name.message}</FormErrorMessage>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label>Локация</Label>
              <Controller
                control={form.control}
                name="building"
                render={({ field }) => (
                  <Select
                    value={field.value !== undefined ? String(field.value) : ''}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите локацию" />
                    </SelectTrigger>
                    <SelectContent>
                      {buildings.map((b) => (
                        <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.building && (
                <FormErrorMessage>{form.formState.errors.building.message}</FormErrorMessage>
              )}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <Label>Тип пространства</Label>
              <Controller
                control={form.control}
                name="type"
                render={({ field }) => (
                  <Select
                    value={field.value !== undefined ? String(field.value) : ''}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      {spaceTypes.map((t) => (
                        <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.type && (
                <FormErrorMessage>{form.formState.errors.type.message}</FormErrorMessage>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="edit-space-floor">Этаж</Label>
              <Input
                id="edit-space-floor"
                type="number"
                placeholder="1"
                {...form.register('floor', {
                  setValueAs: (v) => (v === '' || v === null || v === undefined ? null : Number(v)),
                })}
              />
              {form.formState.errors.floor && (
                <FormErrorMessage>{form.formState.errors.floor.message}</FormErrorMessage>
              )}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="edit-space-capacity">Вместимость</Label>
              <Input
                id="edit-space-capacity"
                type="number"
                placeholder="30"
                {...form.register('capacity', {
                  setValueAs: (v) => (v === '' || v === null || v === undefined || Number.isNaN(Number(v)) ? undefined : Number(v)),
                })}
              />
              {form.formState.errors.capacity && (
                <FormErrorMessage>{form.formState.errors.capacity.message}</FormErrorMessage>
              )}
            </div>
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
