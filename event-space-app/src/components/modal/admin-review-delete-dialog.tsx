import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui';
import { Trash2 } from 'lucide-react';
import { useDeleteReviewById } from '@/api/event-reviews/hooks.ts';

interface Props {
  reviewId: number;
}

export const AdminReviewDeleteDialog: React.FC<Props> = ({ reviewId }) => {
  const [open, setOpen] = useState(false);
  const deleteReviewMutation = useDeleteReviewById();

  const onDelete = () => {
    deleteReviewMutation.mutate(reviewId, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className="text-red-500 hover:bg-red-500 hover:text-white"
        >
          <Trash2 />
          <span>Удалить</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        Вы действительно хотите удалить этот отзыв?
        <DialogFooter className="flex justify-end gap-3 mt-2">
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            disabled={deleteReviewMutation.isPending}
            onClick={onDelete}
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
