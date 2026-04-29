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
import { BookOpen, Building, GraduationCap } from 'lucide-react';
import { usePrograms } from '@/api/programs/hooks.ts';
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import type { EducationData } from '@/schemas/education-data-schema.ts';

interface Props {
  form: ReturnType<typeof useForm<EducationData>>;
}

export const StepEducationData: React.FC<Props> = ({ form }) => {
  const { data, isPending } = usePrograms();

  return (
    <FormProvider {...form}>
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Учебные данные</h3>
          <p className="text-muted-foreground text-sm">
            Укажите ваше направление и курс
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="program">
              Направление <RequiredMark />
            </Label>
            {isPending ? (
              <Skeleton className={'h-9 w-[236px]'} />
            ) : (
              <>
                <Select
                  value={form.watch('program')?.toString()}
                  onValueChange={(value) => {
                    form.setValue('program', Number(value));
                  }}
                >
                  <SelectTrigger className="w-full" id={'program'}>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground shrink-0" />
                      <SelectValue placeholder="Выберите ваше направление" />
                    </div>
                  </SelectTrigger>

                  <SelectContent className="w-full">
                    {data?.map((program) => (
                      <SelectItem key={program.id} value={String(program.id)}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.program && (
                  <FormErrorMessage>
                    {form.formState.errors.program.message}
                  </FormErrorMessage>
                )}
              </>
            )}
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="course">Курс (необязательно)</Label>

            <Select
              value={form.watch('course')?.toString()}
              onValueChange={(value) => form.setValue('course', Number(value))}
            >
              <SelectTrigger className="w-full" id={'course'}>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                  <SelectValue placeholder="Выберите курс" />
                </div>
              </SelectTrigger>

              <SelectContent className="w-full">
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
    </FormProvider>
  );
};
