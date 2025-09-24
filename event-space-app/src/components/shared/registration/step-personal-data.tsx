import { FormErrorMessage, Input, Label, RequiredMark } from '@/components/ui';
import { Mail, User } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { type PersonalInfoData } from '@/schemas/personal-info-schema.ts';
import * as React from 'react';

interface Props {
  form: ReturnType<typeof useForm<PersonalInfoData>>;
}

export const StepPersonalData: React.FC<Props> = ({ form }) => {
  return (
    <FormProvider {...form}>
      <form className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Расскажите о себе</h3>
          <p className="text-muted-foreground text-sm">
            Введите ваши персональные данные
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              Имя <RequiredMark/>
            </Label>
            <div className={'flex flex-col gap-1'}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  placeholder="Иван"
                  className="pl-10"
                  {...form.register('firstName')}
                />
              </div>
              {form.formState.errors.firstName && (
                <FormErrorMessage>
                  {form.formState.errors.firstName.message}
                </FormErrorMessage>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">
              Фамилия <RequiredMark/>
            </Label>
            <div className={'flex flex-col gap-1'}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="lastName"
                  placeholder="Иванов"
                  className="pl-10"
                  {...form.register('lastName')}
                />
              </div>
              {form.formState.errors.lastName && (
                <FormErrorMessage>
                  {form.formState.errors.lastName.message}
                </FormErrorMessage>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email адрес <RequiredMark/>
          </Label>
          <div className={'flex flex-col gap-1'}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
          <p className="text-xs text-muted-foreground">
            Мы будем использовать его для важных уведомлений
          </p>
        </div>
      </form>
    </FormProvider>
  );
};
