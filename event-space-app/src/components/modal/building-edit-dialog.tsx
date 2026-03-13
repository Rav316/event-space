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
import { buildingEditSchema } from '@/schemas/building-edit-schema.ts';
import { useCheckBuildingName, useEditBuilding } from '@/api/buildings/hooks.ts';
import { queryClient } from '@/api/query-client.ts';
import type { BuildingEditDto } from '@/api/buildings/model.ts';
import { BUILDINGS_KEYS } from '@/api/buildings/keys.ts';
import { z } from 'zod';

type BuildingEditForm = z.infer<typeof buildingEditSchema>;

interface Props {
  id: number;
  name: string;
  address: string;
}

export const BuildingEditDialog = ({ id, name, address }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<BuildingEditForm>({
    resolver: zodResolver(buildingEditSchema),
    defaultValues: { name, address },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    if (open) {
      form.reset({ name, address });
    }
  }, [open, name, address, form]);

  const checkNameMutation = useCheckBuildingName();
  const editMutation = useEditBuilding();

  const onSubmit = form.handleSubmit(async (data) => {
    if (data.name !== name) {
      let nameExists = queryClient.getQueryData<boolean>(BUILDINGS_KEYS.nameExists(data.name));

      if (nameExists === undefined) {
        nameExists = await checkNameMutation.mutateAsync(data.name);
      }

      if (nameExists) {
        form.setError('name', {
          type: 'manual',
          message: 'Локация с таким названием уже существует',
        });
        return;
      }
    }

    const dto: BuildingEditDto = { name: data.name, address: data.address };
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
          <DialogTitle>Изменить локацию</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-name">Название</Label>
            <Input
              id="edit-name"
              placeholder="Главный корпус"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <FormErrorMessage>{form.formState.errors.name.message}</FormErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-address">Адрес</Label>
            <Input
              id="edit-address"
              placeholder="ул. Пушкина, д. 1"
              {...form.register('address')}
            />
            {form.formState.errors.address && (
              <FormErrorMessage>{form.formState.errors.address.message}</FormErrorMessage>
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
