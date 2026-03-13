import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Spinner,
} from '@/components/ui';
import { useAdminDeleteEvent } from '@/api/admin/hooks.ts';

interface Props {
  open: boolean;
  onClose: () => void;
  eventId: number;
  eventName: string;
}

export const EventDeleteDialog = ({ open, onClose, eventId, eventName }: Props) => {
  const { mutate: deleteEvent, isPending } = useAdminDeleteEvent();

  const onDelete = () => {
    deleteEvent(eventId, { onSuccess: onClose });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className={'sm:max-w-[420px]'}>
        <DialogHeader>
          <DialogTitle>Удалить мероприятие</DialogTitle>
        </DialogHeader>
        <p>
          Вы действительно хотите удалить мероприятие{' '}
          <span className={'font-medium'}>«{eventName}»</span>?
        </p>
        <DialogFooter>
          <Button variant={'outline'} onClick={onClose} disabled={isPending}>
            Отмена
          </Button>
          <Button variant={'destructive'} onClick={onDelete} disabled={isPending}>
            {isPending && <Spinner />}
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
