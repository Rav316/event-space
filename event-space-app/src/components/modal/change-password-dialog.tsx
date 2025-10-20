import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  FormErrorMessage,
  Label,
  RequiredMark,
} from '@/components/ui';
import { Shield } from 'lucide-react';
import { PasswordInput } from '@/components/shared';
import { FormProvider, useForm } from 'react-hook-form';
import type { UserPasswordChangeDto } from '@/api/users/model.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordChangeSchema } from '@/schemas/password-change-schema.ts';
import { useChangePassword } from '@/api/users/hooks.ts';
import { useState } from 'react';

export const ChangePasswordDialog = () => {
  const [open, setOpen] = useState(false);

  const changePasswordForm = useForm<UserPasswordChangeDto>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const changePasswordMutation = useChangePassword();

  const onSubmit = changePasswordForm.handleSubmit(async (data) => {
    try {
      await changePasswordMutation.mutateAsync(data);
      setOpen(false);
      changePasswordForm.reset();
    } catch (error) {
      console.error('Ошибка при изменении пароля', error);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={true}>
        <Button variant="outline" className="w-full justify-start">
          <Shield />
          <span>Изменить пароль</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Изменить пароль</DialogTitle>
        <DialogDescription>
          Введите текущий пароль и новый пароль для вашей учётной записи
          <FormProvider {...changePasswordForm}>
            <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <Label className="text-black" htmlFor="current-password">
                  Текущий пароль
                  <RequiredMark />
                </Label>
                <PasswordInput
                  placeholder="Введите текущий пароль"
                  id="current-password"
                  {...changePasswordForm.register('currentPassword')}
                />
                {changePasswordForm.formState.errors.currentPassword && (
                  <FormErrorMessage>
                    {
                      changePasswordForm.formState.errors.currentPassword
                        .message
                    }
                  </FormErrorMessage>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-black" htmlFor="new-password">
                  Новый пароль
                  <RequiredMark />
                </Label>
                <PasswordInput
                  placeholder="Введите новый пароль"
                  id="new-password"
                  {...changePasswordForm.register('newPassword')}
                />
                {changePasswordForm.formState.errors.newPassword && (
                  <FormErrorMessage>
                    {changePasswordForm.formState.errors.newPassword.message}
                  </FormErrorMessage>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-black" htmlFor="confirm-password">
                  Подтвердите новый пароль
                  <RequiredMark />
                </Label>
                <PasswordInput
                  placeholder="Подтвердите новый пароль"
                  id="confirm-password"
                  {...changePasswordForm.register('confirmPassword')}
                />
                {changePasswordForm.formState.errors.confirmPassword && (
                  <FormErrorMessage>
                    {
                      changePasswordForm.formState.errors.confirmPassword
                        .message
                    }
                  </FormErrorMessage>
                )}
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Отмена
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={changePasswordMutation.isPending}
                >
                  {changePasswordMutation.isPending
                    ? 'Изменяем...'
                    : 'Изменить пароль'}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
