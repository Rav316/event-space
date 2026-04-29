import {
  passwordCreateSchema,
  type PasswordCreateData,
} from '@/schemas/password-create-schema';
import {
  personalInfoSchema,
  type PersonalInfoData,
} from '@/schemas/personal-info-schema';
import {
  educationDataSchema,
  type EducationData,
} from '@/schemas/education-data-schema.ts';
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

  const educationDataForm = useForm<EducationData>({
    resolver: zodResolver(educationDataSchema),
    defaultValues: {
      program: registrationData.program,
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

  return { personalDataForm, educationDataForm: educationDataForm, passwordCreateForm };
};
