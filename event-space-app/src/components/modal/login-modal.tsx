import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormErrorMessage,
  Input,
  Label, Spinner
} from '@/components/ui';
import { LogIn, Mail } from 'lucide-react';
import { PasswordInput } from '@/components/shared';
import { useLogin } from '@/api/auth/hooks.ts';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, type LoginData } from '@/schemas/form-login-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import { useAuthModalStore } from '@/store/use-auth-modal-store.ts';

export const LoginModal = () => {
  const open = useAuthModalStore((state) => state.isOpen);
  const setOpen = useAuthModalStore((state) => state.setIsOpen);
  const loginMutation = useLogin();

  const form = useForm<LoginData>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if(!open) {
      form.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        aria-describedby={undefined}
      >
        <DialogTitle className="text-center text-2xl">
          Вход в систему
        </DialogTitle>

        <FormProvider {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Email */}
            <Label htmlFor="email">Email</Label>
            <div className={'flex flex-col gap-1'}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@student.ru"
                  className="pl-10"
                  {...form.register('email')}
                />
              </div>
              {form.formState.errors.email && (
                <FormErrorMessage>
                  {form.formState.errors.email.message}
                </FormErrorMessage>
              )}
            </div>

            {/* Password */}
            <Label htmlFor="password">Пароль</Label>
            <div className={'flex flex-col gap-1'}>
              <PasswordInput {...form.register('password')} />
              {form.formState.errors.password && (
                <FormErrorMessage>
                  {form.formState.errors.password.message}
                </FormErrorMessage>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <div className="flex items-center justify-center gap-x-2">
                  <Spinner/>
                  <span>Вход...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-x-2">
                  <LogIn />
                  <span>Войти</span>
                </div>
              )}
            </Button>
          </form>
        </FormProvider>
        <div className="gap-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">или</span>
            </div>
          </div>

          <div className="text-center gap-y-2">
            <p className="text-sm text-muted-foreground">
              Нет аккаунта?{' '}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
                onClick={() => setOpen(false)}
              >
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
