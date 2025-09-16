import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@/components/ui';
import { LogIn, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { PasswordInput } from '@/components/shared';
import { useLogin } from '@/api/auth/hooks.ts';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, type LoginData } from '@/schemas/auth-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const loginMutation = useLogin();

  const form = useForm<LoginData>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginData) => {
    console.log('on submit');
    loginMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={true}>
        <Button>
          <span>Войти</span>
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogTitle className={'text-center text-2xl'}>
          Вход в систему
        </DialogTitle>
        <FormProvider {...form}>
          <form className={'space-y-4'} onSubmit={form.handleSubmit(onSubmit)}>
            <Label htmlFor={'email'}>Email</Label>
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
            <Label htmlFor={'password'}>Пароль</Label>
            <PasswordInput {...form.register('password')} />
            <Button
              type={'submit'}
              className={'w-full'}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <div className={'flex items-center justify-center gap-x-2'}>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-r-transparent rounded-full" />
                  <span>Вход...</span>
                </div>
              ) : (
                <div className={'flex items-center justify-center gap-x-2'}>
                  <LogIn />
                  <span>Войти</span>
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
