import React from 'react';
import { useRemoveEvent } from '@/api/events/hooks.ts';
import { Button, Dialog, DialogContent, DialogFooter } from '@/components/ui';

interface Props {
  eventId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RemoveEventModal: React.FC<Props> = ({
  eventId,
  open,
  onOpenChange,
}) => {
  const removeEventMutation = useRemoveEvent();

  const onDelete = () => {
    removeEventMutation.mutate(eventId, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        Вы действительно хотите удалить событие?
        <DialogFooter className="flex justify-end gap-3 mt-2">
          <Button onClick={() => onOpenChange(false)}>Отмена</Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={onDelete}
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
