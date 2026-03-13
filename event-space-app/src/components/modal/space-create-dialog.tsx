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
import {
  type SpaceCreateFormData,
  spaceCreateSchema,
} from '@/schemas/space-create-schema.ts';
import {
  useCheckSpaceNameAndBuilding,
  useCreateSpace,
  useSpaceTypes,
} from '@/api/spaces/hooks.ts';
import { useBuildings } from '@/api/buildings/hooks.ts';

export const SpaceCreateDialog = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<SpaceCreateFormData>({
    resolver: zodResolver(spaceCreateSchema),
    defaultValues: {
      name: '',
      building: undefined,
      type: undefined,
      floor: undefined,
      capacity: undefined,
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { data: buildings = [] } = useBuildings();
  const { data: spaceTypes = [] } = useSpaceTypes();
  const checkNameMutation = useCheckSpaceNameAndBuilding();
  const createMutation = useCreateSpace();

  const onSubmit = form.handleSubmit(async (data) => {
    const nameExists = await checkNameMutation.mutateAsync({
      name: data.name,
      building: data.building,
    });

    if (nameExists) {
      form.setError('name', {
        type: 'manual',
        message: 'Пространство с таким названием уже существует в этой локации',
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
          <span>Добавить пространство</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить пространство</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Название</Label>
            <Input
              id="name"
              placeholder="Аудитория 101"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <FormErrorMessage>
                {form.formState.errors.name.message}
              </FormErrorMessage>
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
                        <SelectItem key={t.id} value={String(t.id)}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.type && (
                <FormErrorMessage>
                  {form.formState.errors.type.message}
                </FormErrorMessage>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="floor">Этаж</Label>
              <Input
                id="floor"
                type="number"
                placeholder="1"
                {...form.register('floor', {
                  setValueAs: (v) =>
                    v === '' || v === null || v === undefined
                      ? undefined
                      : Number(v),
                })}
              />
              {form.formState.errors.floor && (
                <FormErrorMessage>
                  {form.formState.errors.floor.message}
                </FormErrorMessage>
              )}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="capacity">Вместимость</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="30"
                {...form.register('capacity', {
                  setValueAs: (v) =>
                    v === '' ||
                    v === null ||
                    v === undefined ||
                    Number.isNaN(Number(v))
                      ? undefined
                      : Number(v),
                })}
              />
              {form.formState.errors.capacity && (
                <FormErrorMessage>
                  {form.formState.errors.capacity.message}
                </FormErrorMessage>
              )}
            </div>
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
