import type { UseMutationResult } from '@tanstack/react-query';
import type { UseFormReturn } from 'react-hook-form';

interface ValidateEmailUniqueOptions {
  email: string;
  checkEmailMutation: UseMutationResult<boolean, unknown, string, unknown> & {
    mutateAsync: (email: string) => Promise<boolean>;
  };
  form?: UseFormReturn<any>;
  defaultEmail?: string;
}

export const validateEmailUnique = async ({
  email,
  checkEmailMutation,
  form,
  defaultEmail,
}: ValidateEmailUniqueOptions) => {
  if (defaultEmail && email === defaultEmail) return true;

  const exists = await checkEmailMutation.mutateAsync(email);

  if (exists && form) {
    form.setError('email', {
      type: 'manual',
      message: 'Пользователь с таким email уже зарегистрирован',
    });
    return false;
  }

  return !exists;
};
