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
import {
  useDeleteFaculty,
  useFacultyDeleteImpact,
} from '@/api/faculties/hooks.ts';

interface Props {
  id: number;
  name: string;
}

export const FacultyDeleteDialog = ({ id, name }: Props) => {
  const [open, setOpen] = useState(false);

  const { data: impact, isFetching, refetch } = useFacultyDeleteImpact(id);
  const deleteMutation = useDeleteFaculty();

  const handleOpenChange = async (value: boolean) => {
    setOpen(value);
    if (value) await refetch();
  };

  const onDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className={'h-8 w-8'}>
          <Trash2 className={'w-4 h-4 text-red-500'} />
        </Button>
      </DialogTrigger>
      <DialogContent className={'sm:max-w-[420px]'}>
        <DialogHeader>
          <DialogTitle>Удалить факультет</DialogTitle>
        </DialogHeader>

        {isFetching ? (
          <div className={'flex justify-center py-4'}>
            <Spinner />
          </div>
        ) : (
          <div className={'flex flex-col gap-3'}>
            <p>
              Вы действительно хотите удалить факультет{' '}
              <span className={'font-medium'}>«{name}»</span>?
            </p>
            {impact && impact.users > 0 && (
              <div
                className={
                  'rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700'
                }
              >
                <p className={'font-medium mb-1'}>
                  Вместе с ним будет удалено:
                </p>
                <ul className={'list-disc list-inside space-y-0.5'}>
                  <li>{impact.users} пользователь(ей)</li>
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
