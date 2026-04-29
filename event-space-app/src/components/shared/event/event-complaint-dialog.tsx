import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  FormErrorMessage,
  RequiredMark,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Spinner,
  Textarea,
} from '@/components/ui';
import { AlertCircle } from 'lucide-react';
import {
  useComplaintTypes,
  useCreateComplaint,
} from '@/api/complaint/hooks.ts';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { complaintCreateSchema } from '@/schemas/complaint-create-schema.ts';
import type { ComplaintCreateDto } from '@/api/complaint/model.ts';
import { COMPLAINT_TARGET_TYPES } from '@/api/complaint/constants.ts';
import type { z } from 'zod';

type ComplaintFormValues = z.infer<typeof complaintCreateSchema>;

const MAX_DESCRIPTION_LENGTH = 500;

interface Props {
  open: boolean;
  onClose: () => void;
  eventId: number;
}

export const EventComplaintDialog: React.FC<Props> = ({
  open,
  onClose,
  eventId,
}) => {
  const { data: complaintTypes, isPending: isComplaintTypesPending } =
    useComplaintTypes(open);
  const complaintCreateMutation = useCreateComplaint();

  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintCreateSchema),
    defaultValues: {
      complaintType: undefined,
      description: '',
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = (data: ComplaintFormValues) => {
    const dto: ComplaintCreateDto = {
      targetType: COMPLAINT_TARGET_TYPES.EVENT,
      targetId: eventId,
      complaintType: data.complaintType!,
      description: data.description,
    };
    complaintCreateMutation.mutate(dto, {
      onSuccess: handleClose,
    });
  };

  const description = form.watch('description');

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v && !complaintCreateMutation.isPending) handleClose();
      }}
    >
      <DialogContent className={'sm:max-w-lg'}>
        <DialogHeader>
          <DialogTitle className={'flex items-center gap-2'}>
            <AlertCircle className={'w-5 h-5 text-yellow-500'} />
            Пожаловаться на мероприятие
          </DialogTitle>
          <DialogDescription>
            Пожалуйста, выберите причину жалобы и опишите проблему. Мы
            рассмотрим вашу жалобу в ближайшее время.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className={'flex flex-col gap-4 py-1'}>
            <div className={'flex flex-col gap-1.5'}>
              <label className={'font-medium text-sm'}>
                Причина жалобы <RequiredMark />
              </label>
              {isComplaintTypesPending ? (
                <Skeleton className={'w-full h-8'} />
              ) : (
                <Controller
                  name="complaintType"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : ''}
                      onValueChange={(v) => field.onChange(Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={'Выберите причину жалобы'} />
                      </SelectTrigger>
                      <SelectContent>
                        {complaintTypes?.map((r) => (
                          <SelectItem key={r.id} value={String(r.id)}>
                            {r.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              )}
              {form.formState.errors.complaintType && (
                <FormErrorMessage>
                  {form.formState.errors.complaintType.message}
                </FormErrorMessage>
              )}
            </div>

            <div className={'flex flex-col gap-1.5'}>
              <label className={'font-medium text-sm'}>
                Подробное описание <RequiredMark />
              </label>
              <Textarea
                {...form.register('description')}
                onChange={(e) =>
                  form.setValue(
                    'description',
                    e.target.value.slice(0, MAX_DESCRIPTION_LENGTH),
                    {
                      shouldValidate: form.formState.isSubmitted,
                    },
                  )
                }
                placeholder={
                  'Опишите подробно, что именно не так с этим мероприятием...'
                }
                className={
                  'resize-none min-h-20 max-h-40 overflow-y-auto break-all'
                }
              />
              <span className={'text-xs text-muted-foreground text-right'}>
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </span>
              {form.formState.errors.description && (
                <FormErrorMessage>
                  {form.formState.errors.description.message}
                </FormErrorMessage>
              )}
            </div>
          </div>

          <div className={'flex justify-end gap-2 pt-5'}>
            <Button
              type="button"
              variant={'outline'}
              onClick={handleClose}
              disabled={complaintCreateMutation.isPending}
            >
              Отмена
            </Button>
            <Button type="submit">
              {complaintCreateMutation.isPending ? (
                <>
                  <Spinner />
                  Отправка...
                </>
              ) : (
                'Отправить жалобу'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
