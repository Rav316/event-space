import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormErrorMessage,
  Input,
  Label,
} from '@/components/ui';
import { X } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import type { UserDeleteDto } from '@/api/users/model.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountDeleteSchema } from '@/schemas/account-delete-schema.ts';
import { PasswordInput } from '@/components/shared';
import { useDeleteAccount } from '@/api/users/hooks.ts';
import { useState } from 'react';

export const DeleteAccountModal = () => {
  const [open, setOpen] = useState(false);

  const accountDeleteForm = useForm<UserDeleteDto>({
    resolver: zodResolver(accountDeleteSchema),
    defaultValues: {
      currentPassword: '',
      confirmationPhrase: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  const accountDeleteMutation = useDeleteAccount();

  const onSubmit = accountDeleteForm.handleSubmit(async (data) => {
    try {
      await accountDeleteMutation.mutateAsync(data, {
        onError: () => {
          setOpen(false);
        }
      });
      setOpen(false);
    } catch (error) {
      console.error('Ошибка при удалении аккаунта', error);
    } finally {
      accountDeleteForm.reset();
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={true}>
        <Button variant={'destructive'} className={'justify-start'}>
          <X />
          <span>Удалить аккаунт</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удаление аккаунта</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Вы действительно хотите удалить свой аккаунт?
          <br />
          При удалении аккаунта все данные будут удалены.
          <br />
          <span className="text-red-500 font-semibold">Внимание!</span> Это
          необратимая операция
        </DialogDescription>

        <FormProvider {...accountDeleteForm}>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-black">
                Текущий пароль
              </Label>
              <PasswordInput
                id="currentPassword"
                {...accountDeleteForm.register('currentPassword')}
              />
              {accountDeleteForm.formState.errors.currentPassword && (
                <FormErrorMessage>
                  {accountDeleteForm.formState.errors.currentPassword.message}
                </FormErrorMessage>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmationPhrase" className="text-black">
                Введите фразу{' '}
                <span className="text-red-500">&quot;удалить мой аккаунт&quot;</span>
              </Label>
              <Input
                className="text-black"
                id="confirmationPhrase"
                {...accountDeleteForm.register('confirmationPhrase')}
                placeholder="удалить мой аккаунт"
              />
              {accountDeleteForm.formState.errors.confirmationPhrase && (
                <FormErrorMessage>
                  {accountDeleteForm.formState.errors.confirmationPhrase.message}
                </FormErrorMessage>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild={true}>
                <Button type="button" variant="outline">
                  <span className="text-black">Отмена</span>
                </Button>
              </DialogClose>
              <Button type="submit" disabled={accountDeleteMutation.isPending}>
                {accountDeleteMutation.isPending ? 'Удаление...' : 'Удалить'}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
