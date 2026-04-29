import { Checkbox, Separator, Switch } from '@/components/ui';
import { ChangePasswordDialog, DeleteAccountModal } from '@/components/modal';
import React from 'react';
import { Controller, type useForm } from 'react-hook-form';
import type { UserEditDto } from '@/api/users/model.ts';
import { useEventCategories } from '@/api/event-categories/hooks.ts';

interface Props {
  editMode?: boolean;
  form: ReturnType<typeof useForm<UserEditDto>>;
}

export const UserSettings: React.FC<Props> = ({ editMode, form }) => {
  const { data: categories } = useEventCategories();

  return (
    <form className={'flex flex-col gap-5'}>
      <div className={'flex flex-col gap-5 border border-[#E8E8E8] rounded-2xl p-5'}>
        <div className={'flex flex-col gap-1'}>
          <h3 className={'font-medium text-xl'}>Уведомления</h3>
        </div>
        <Controller
          control={form.control}
          name="emailNotificationsEnabled"
          render={({ field }) => {
            const enabled = field.value ?? true;
            return (
              <label className={`flex items-center justify-between gap-3 ${editMode ? 'cursor-pointer' : 'cursor-default'}`}>
                <div className={'flex flex-col gap-0.5'}>
                  <span className={'font-medium'}>Email-уведомления</span>
                  <span className={'text-muted-foreground text-sm'}>
                   Полностью отключить email-уведомления
                  </span>
                </div>
                <Switch
                  checked={enabled}
                  disabled={!editMode}
                  onCheckedChange={(checked) => {
                    if (!editMode) return;
                    field.onChange(checked);
                  }}
                />
              </label>
            );
          }}
        />
        <Separator />
        <div className={'flex flex-col gap-1.5'}>
          <span className={'font-medium'}>Новые мероприятия</span>
          <span className={'text-muted-foreground text-sm'}>
            Получать письма о создании мероприятий в выбранных категориях
          </span>
        </div>
        <Controller
          control={form.control}
          name="notificationCategoryIds"
          render={({ field }) => {
            const notificationsEnabled = form.watch('emailNotificationsEnabled') ?? true;
            return (
              <div className={'grid grid-cols-2 gap-x-8 gap-y-3'}>
                {categories?.map((category) => {
                  const selected = (field.value ?? []).includes(category.id);
                  return (
                    <label
                      key={category.id}
                      className={`flex items-center gap-3 ${editMode && notificationsEnabled ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <Checkbox
                        checked={selected}
                        disabled={!editMode || !notificationsEnabled}
                        onCheckedChange={(checked) => {
                          if (!editMode || !notificationsEnabled) return;
                          const current = field.value ?? [];
                          field.onChange(
                            checked
                              ? [...current, category.id]
                              : current.filter((id) => id !== category.id),
                          );
                        }}
                      />
                      <span className={`text-sm ${!notificationsEnabled ? 'text-muted-foreground' : ''}`}>
                        {category.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            );
          }}
        />
      </div>
      <div className={'flex flex-col gap-5 border border-[#E8E8E8] rounded-2xl p-5'}>
        <h3 className={'font-medium text-xl'}>Безопасность</h3>
        <ChangePasswordDialog />
        <Separator />
        <DeleteAccountModal />
      </div>
    </form>
  );
};
