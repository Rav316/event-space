import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger, Input, Label
} from '@/components/ui';
import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export const LoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button>
          <span>Войти</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className={'text-center text-2xl'}>Вход в систему</DialogTitle>
        <Label htmlFor={'email'}>Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="example@student.ru"
            className="pl-10"
          />
        </div>
        <Label htmlFor={'password'}>Пароль</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Введите пароль"
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
        <Button>
          <LogIn/>
          <span>Войти</span>
        </Button>
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
              <Link to="/register" className="text-primary hover:underline font-medium">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
