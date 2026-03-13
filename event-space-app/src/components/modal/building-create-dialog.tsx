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
import { buildingCreateSchema } from '@/schemas/building-create-schema.ts';
import {
  useCheckBuildingName,
  useCreateBuilding,
} from '@/api/buildings/hooks.ts';
import type { BuildingCreateDto } from '@/api/buildings/model.ts';

export const BuildingCreateDialog = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<BuildingCreateDto>({
    resolver: zodResolver(buildingCreateSchema),
    defaultValues: { name: '', address: '' },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const checkNameMutation = useCheckBuildingName();
  const createMutation = useCreateBuilding();

  const onSubmit = form.handleSubmit(async (data) => {
    const nameExists = await checkNameMutation.mutateAsync(data.name);

    if (nameExists) {
      form.setError('name', {
        type: 'manual',
        message: 'Локация с таким названием уже существует',
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
          <span>Добавить локацию</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить локацию</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Название</Label>
            <Input
              id="name"
              placeholder="Главный корпус"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <FormErrorMessage>
                {form.formState.errors.name.message}
              </FormErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Адрес</Label>
            <Input
              id="address"
              placeholder="ул. Пушкина, д. 1"
              {...form.register('address')}
            />
            {form.formState.errors.address && (
              <FormErrorMessage>
                {form.formState.errors.address.message}
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
