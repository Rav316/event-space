import {
  FormErrorMessage,
  Label,
  RequiredMark,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from '@/components/ui';
import { BookOpen, Building, GraduationCap, Users } from 'lucide-react';
import { useFaculties } from '@/api/faculties/hooks.ts';
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import type { RoleStatusData } from '@/schemas/role-status-schema.ts';
import { type Role, Roles } from '@/api/auth/model.ts';
import { cn } from '@/lib/utils.ts';

interface Props {
  form: ReturnType<typeof useForm<RoleStatusData>>;
}

export const StepRoleStatus: React.FC<Props> = ({ form }) => {
  const { data, isPending } = useFaculties();

  const onRoleChange = (role: Role) => {
    form.setValue('role', role);
  };

  return (
    <FormProvider {...form}>
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Ваш статус</h3>
          <p className="text-muted-foreground text-sm">
            Выберите вашу роль в образовательном процессе
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-[460px]:grid-cols-1">
          <button
            type="button"
            className={cn(
              'p-4 rounded-lg border-1 transition-all text-left',
              form.watch('role') === Roles.PARTICIPANT
                ? 'border-primary bg-primary/10'
                : 'border-border',
            )}
            onClick={() => onRoleChange(Roles.PARTICIPANT)}
          >
            <BookOpen className="w-6 h-6 mb-2 text-primary" />
            <div className="font-medium">Участник</div>
            <div className="text-xs text-muted-foreground">
              Участие в мероприятиях
            </div>
          </button>

          <button
            type="button"
            className={cn(
              'p-4 rounded-lg border-1 transition-all text-left',
              form.watch('role') === Roles.ORGANIZER
                ? 'border-primary bg-primary/10'
                : 'border-border',
            )}
            onClick={() => onRoleChange(Roles.ORGANIZER)}
          >
            <GraduationCap className="w-6 h-6 mb-2 text-primary" />
            <div className="font-medium">Организатор</div>
            <div className="text-xs text-muted-foreground">
              Создание мероприятий
            </div>
          </button>
          {form.formState.errors.role && (
            <FormErrorMessage>
              {form.formState.errors.role.message}
            </FormErrorMessage>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="faculty">
              Факультет <RequiredMark />
            </Label>
            {isPending ? (
              <Skeleton className={'h-9 w-[236px]'} />
            ) : (
              <>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                  <Select
                    value={form.watch('faculty')?.toString()}
                    onValueChange={(value) =>
                      form.setValue('faculty', Number(value))
                    }
                  >
                    <SelectTrigger className="pl-10" id={'faculty'}>
                      <SelectValue placeholder="Выберите ваш факультет" />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.map((faculty) => (
                        <SelectItem key={faculty.id} value={String(faculty.id)}>
                          {faculty.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {form.formState.errors.faculty && (
                  <FormErrorMessage>
                    {form.formState.errors.faculty.message}
                  </FormErrorMessage>
                )}
              </>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Курс (необязательно)</Label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Select
                value={form.watch('course')?.toString()}
                onValueChange={(value) =>
                  form.setValue('course', Number(value))
                }
              >
                <SelectTrigger className="pl-10" id={'course'}>
                  <SelectValue placeholder="Выберите курс" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((course) => (
                    <SelectItem key={course} value={String(course)}>
                      {course} курс
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
