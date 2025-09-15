import { Input, Label } from '@/components/ui';
import { Mail, User } from 'lucide-react';

export const StepPersonalData = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Расскажите о себе</h3>
        <p className="text-muted-foreground text-sm">
          Введите ваши персональные данные
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Имя *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="firstName" placeholder="Иван" className="pl-10" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Фамилия *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="lastName" placeholder="Иванов" className="pl-10" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email адрес *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="example@student.ru"
            className="pl-10"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Мы будем использовать его для важных уведомлений
        </p>
      </div>
    </div>
  );
};
