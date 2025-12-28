import { ProfileSetting } from '@/components/shared';
import { Separator } from '@/components/ui';
import { ChangePasswordDialog, DeleteAccountModal } from '@/components/modal';
import React from 'react';

interface Props {
  editMode?: boolean;
}

export const UserSettings: React.FC<Props> = ({ editMode }) => {
  return (
    <div className={'flex flex-col gap-5'}>
      <div
        className={
          'flex flex-col gap-5 border border-[#E5E5E5] rounded-2xl p-5'
        }
      >
        <h3 className={'font-medium text-xl'}>Уведомления</h3>
        <ProfileSetting
          editMode={editMode}
          title={'Email уведомления'}
          description={'Получать уведомления на email'}
        />
        <ProfileSetting
          editMode={editMode}
          title={'Напоминания о событиях'}
          description={'Напоминания перед началом мероприятий'}
        />
        <ProfileSetting
          editMode={editMode}
          title={'Новые мероприятия'}
          description={'Уведомления о новых мероприятиях'}
        />
      </div>
      <div
        className={
          'flex flex-col gap-5 border border-[#E5E5E5] rounded-2xl p-5'
        }
      >
        <h3 className={'font-medium text-xl'}>Приватность</h3>
        <ProfileSetting
          editMode={editMode}
          title={'Показывать email'}
          description={'Другие пользователи смогут увидеть ваш email'}
        />
        <ProfileSetting
          editMode={editMode}
          title={'Показывать телефон'}
          description={'Другие пользователи смогут увидеть ваш email'}
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
    </div>
  );
};
