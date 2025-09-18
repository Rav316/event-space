import { FormErrorMessage, Label } from '@/components/ui';
import { CheckCircle, Lock } from 'lucide-react';
import { PasswordInput } from '@/components/shared';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { PasswordCreateData } from '@/schemas/password-create-schema.ts';

interface Props {
  form: ReturnType<typeof useForm<PasswordCreateData>>;
}

export const StepSecurity: React.FC<Props> = ({ form }) => {
  return (
    <FormProvider {...form}>
      <form className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Защитите аккаунт</h3>
          <p className="text-muted-foreground text-sm">
            Создайте надежный пароль для безопасности
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Пароль *</Label>
          <PasswordInput {...form.register('password')} />
          {form.formState.errors.password && (
            <FormErrorMessage>
              {form.formState.errors.password.message}
            </FormErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Подтвердите пароль *</Label>
          <PasswordInput
            id={'confirmPassword'}
            placeholder={'Подтвердите пароль'}
            {...form.register('confirmPassword')}
          />
          {form.formState.errors.confirmPassword && (
            <FormErrorMessage>
              {form.formState.errors.confirmPassword.message}
            </FormErrorMessage>
          )}
        </div>

        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium mb-1">
                Рекомендации для пароля:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Минимум 6 символов</li>
                <li>• Комбинация букв и цифр</li>
                <li>• Избегайте простых паролей</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
