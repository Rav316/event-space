import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui';
import { Trash2 } from 'lucide-react';
import { useDeleteReview } from '@/api/events/hooks.ts';

interface Props {
  eventId: number;
}

export const ConfirmReviewDeletionDialog: React.FC<Props> = ({ eventId }) => {
  const [open, setOpen] = useState(false);
  const deleteReviewMutation = useDeleteReview();

  const onDelete = () => {
    deleteReviewMutation.mutate(eventId, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white max-[400px]:w-full">
          <Trash2 />
          <span>Удалить</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        Вы действительно хотите удалить отзыв?

        <DialogFooter className="flex justify-end gap-3 mt-2">
          <Button
            onClick={() => setOpen(false)}
          >
            Нет, отмена
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={onDelete}
          >
            Да, удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
