import {
  passwordCreateSchema,
  type PasswordCreateData,
} from '@/schemas/password-create-schema';
import {
  personalInfoSchema,
  type PersonalInfoData,
} from '@/schemas/personal-info-schema';
import {
  roleStatusSchema,
  type RoleStatusData,
} from '@/schemas/role-status-schema';
import { useRegistrationStore } from '@/store/use-registration-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useRegistrationForms = () => {
  const registrationData = useRegistrationStore((s) => s.registrationData);

  const personalDataForm = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
      email: registrationData.email,
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const roleStatusForm = useForm<RoleStatusData>({
    resolver: zodResolver(roleStatusSchema),
    defaultValues: {
      role: registrationData.role,
      faculty: registrationData.faculty,
      course: registrationData.course,
    },
  });

  const passwordCreateForm = useForm<PasswordCreateData>({
    resolver: zodResolver(passwordCreateSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  return { personalDataForm, roleStatusForm, passwordCreateForm };
};
