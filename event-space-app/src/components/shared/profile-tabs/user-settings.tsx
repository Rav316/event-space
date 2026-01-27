import { ProfileSetting } from '@/components/shared';
import { Separator } from '@/components/ui';
import { ChangePasswordDialog, DeleteAccountModal } from '@/components/modal';
import React from 'react';
import { Controller, type useForm } from 'react-hook-form';
import type { UserEditDto } from '@/api/users/model.ts';

interface Props {
  editMode?: boolean;
  form: ReturnType<typeof useForm<UserEditDto>>;
}

export const UserSettings: React.FC<Props> = ({ editMode, form }) => {
  return (
    <form className={'flex flex-col gap-5'}>
      <div
        className={
          'flex flex-col gap-5 border border-[#E5E5E5] rounded-2xl p-5'
        }
      >
        <h3 className={'font-medium text-xl'}>Уведомления</h3>
        <Controller
          control={form.control}
          name="newEventNotifications"
          render={({ field }) => (
            <ProfileSetting
              editMode={editMode}
              title="Новые мероприятия"
              description="Уведомления о новых мероприятиях"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <ProfileSetting
          editMode={editMode}
          title={'Напоминания о событиях'}
          description={'Напоминания перед началом мероприятий'}
          value={false}
          onChange={() => {}}
        />
        <ProfileSetting
          editMode={editMode}
          title={'Новые мероприятия'}
          description={'Уведомления о новых мероприятиях'}
          value={false}
          onChange={() => {}}
        />
      </div>
      <div
        className={
          'flex flex-col gap-5 border border-[#E5E5E5] rounded-2xl p-5'
        }
      >
        <h3 className={'font-medium text-xl'}>Безопасность</h3>
        <ChangePasswordDialog />
        <Separator />
        <DeleteAccountModal />
      </div>
    </form>
  );
};
