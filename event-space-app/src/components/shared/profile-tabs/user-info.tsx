import {
  FormErrorMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Textarea,
} from '@/components/ui';
import React from 'react';
import { FormProvider, type useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import { useFaculties } from '@/api/faculties/hooks.ts';
import type { UserEditDto } from '@/api/users/model.ts';

interface Props {
  editMode?: boolean;
  form: ReturnType<typeof useForm<UserEditDto>>;
}

export const UserInfo: React.FC<Props> = ({ editMode, form }) => {
  const registerWithMask = useHookFormMask(form.register);
  const { data: faculties, isPending: isFacultiesPending } = useFaculties();

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 border border-[#E8E8E8] rounded-2xl p-5">
          <h3 className={'font-medium text-xl'}>Основная информация</h3>
          <div className="grid grid-cols-2 gap-5 max-[500px]:grid-cols-1">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                placeholder="Введите имя"
                disabled={!editMode}
                {...form.register('firstName')}
              />
              {form.formState.errors.firstName && (
                <FormErrorMessage>
                  {form.formState.errors.firstName.message}
                </FormErrorMessage>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="last-name">Фамилия</Label>
              <Input
                id="last-name"
                placeholder="Введите фамилию"
                disabled={!editMode}
                {...form.register('lastName')}
              />
              {form.formState.errors.lastName && (
                <FormErrorMessage>
                  {form.formState.errors.lastName.message}
                </FormErrorMessage>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Введите email"
                disabled={!editMode}
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <FormErrorMessage>
                  {form.formState.errors.email.message}
                </FormErrorMessage>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="faculty">Факультет</Label>
              {isFacultiesPending ? (
                <Skeleton className={'w-full h-8'} />
              ) : (
                <Select
                  value={
                    form.watch('faculty')?.toString() === '0'
                      ? undefined
                      : form.watch('faculty')?.toString()
                  }
                  onValueChange={(value) =>
                    form.setValue('faculty', Number(value))
                  }
                  disabled={!editMode}
                >
                  <SelectTrigger id={'faculty'} className={'w-full'}>
                    <SelectValue placeholder={'Выберите факультет'} />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties?.map((faculty) => (
                      <SelectItem key={faculty.id} value={String(faculty.id)}>
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="course">Курс</Label>
              <Select
                value={
                  form.watch('course')?.toString() === '0'
                    ? undefined
                    : form.watch('course')?.toString()
                }
                onValueChange={(value) =>
                  form.setValue('course', Number(value))
                }
                disabled={!editMode}
              >
                <SelectTrigger id={'course'} className={'w-full'}>
                  <SelectValue placeholder={'Выберите курс'} />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((course) => (
                    <SelectItem key={course} value={String(course)}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.course && (
                <FormErrorMessage>
                  {form.formState.errors.course.message}
                </FormErrorMessage>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="phone">Номер телефона</Label>
              <Input
                id="phone"
                placeholder="Введите номер телефона"
                disabled={!editMode}
                {...registerWithMask('phone', ['+7 999 999-99-99'], {
                  required: true,
                  showMaskOnHover: false,
                })}
              />
              {form.formState.errors.phone && (
                <FormErrorMessage>
                  {form.formState.errors.phone.message}
                </FormErrorMessage>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">О себе</Label>
            <Textarea
              id="description"
              className="resize-none"
              placeholder="Расскажите о себе"
              disabled={!editMode}
              {...form.register('description')}
            />
            {form.formState.errors.description && (
              <FormErrorMessage>
                {form.formState.errors.description.message}
              </FormErrorMessage>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 border border-[#E8E8E8] rounded-2xl p-5">
          <h3 className={'font-medium text-xl'}>Социальные сети</h3>
          <div className="flex gap-5 max-[600px]:flex-col">
            <div className="flex flex-col gap-1 flex-1">
              <Label htmlFor="telegram">Telegram</Label>
              <Input
                id="telegram"
                placeholder="@username"
                disabled={!editMode}
                {...form.register('tgUsername')}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <Label htmlFor="vkontakte">VKontakte</Label>
              <Input
                id="vkontakte"
                placeholder="vk.com/username"
                disabled={!editMode}
                {...form.register('vkUrl')}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                placeholder="github.com/username"
                disabled={!editMode}
                {...form.register('githubUrl')}
              />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
