import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from '@/components/ui';
import { useDeleteBuilding, useDeleteImpact } from '@/api/buildings/hooks.ts';

interface Props {
  id: number;
  name: string;
}

export const BuildingDeleteDialog = ({ id, name }: Props) => {
  const [open, setOpen] = useState(false);

  const { data: impact, isFetching, refetch } = useDeleteImpact(id);
  const deleteMutation = useDeleteBuilding();

  const handleOpenChange = async (value: boolean) => {
    setOpen(value);
    if (value) await refetch();
  };

  const onDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => setOpen(false),
    });
  };

  const hasImpact = impact && (impact.faculties > 0 || impact.users > 0 || impact.spaces > 0 || impact.events > 0);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className={'h-8 w-8'}>
          <Trash2 className={'w-4 h-4 text-red-500'} />
        </Button>
      </DialogTrigger>
      <DialogContent className={'sm:max-w-[420px]'}>
        <DialogHeader>
          <DialogTitle>Удалить локацию</DialogTitle>
        </DialogHeader>

        {isFetching ? (
          <div className={'flex justify-center py-4'}>
            <Spinner />
          </div>
        ) : (
          <div className={'flex flex-col gap-3'}>
            <p>
              Вы действительно хотите удалить локацию <span className={'font-medium'}>«{name}»</span>?
            </p>
            {hasImpact && (
              <div className={'rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700'}>
                <p className={'font-medium mb-1'}>Вместе с ней будет удалено:</p>
                <ul className={'list-disc list-inside space-y-0.5'}>
                  {impact.faculties > 0 && <li>{impact.faculties} факультет(ов)</li>}
                  {impact.users > 0 && <li>{impact.users} пользователь(ей)</li>}
                  {impact.spaces > 0 && <li>{impact.spaces} помещение(й)</li>}
                  {impact.events > 0 && <li>{impact.events} мероприятие(й)</li>}
                </ul>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant={'outline'} onClick={() => setOpen(false)}>
            Отмена
          </Button>
          <Button
            variant={'destructive'}
            onClick={onDelete}
            disabled={isFetching || deleteMutation.isPending}
          >
            {deleteMutation.isPending && <Spinner />}
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
