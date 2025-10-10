import { ProfileSetting } from '@/components/shared/profile-setting.tsx';
import { Button, Separator } from '@/components/ui';
import { X } from 'lucide-react';
import { ChangePasswordDialog } from '@/components/modal';

export const UserSettings = () => {
  return (
    <div className={'flex flex-col gap-5'}>
      <div
        className={
          'flex flex-col gap-5 border border-[#E5E5E5] rounded-2xl p-5'
        }
      >
        <h3 className={'font-medium text-xl'}>Уведомления</h3>
        <ProfileSetting
          title={'Email уведомления'}
          description={'Получать уведомления на email'}
        />
        <ProfileSetting
          title={'Напоминания о событиях'}
          description={'Напоминания перед началом мероприятий'}
        />
        <ProfileSetting
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
          title={'Показывать email'}
          description={'Другие пользователи смогут увидеть ваш email'}
        />
        <ProfileSetting
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
        <ChangePasswordDialog/>
        <Separator/>
        <Button variant={'destructive'} className={'justify-start'}>
          <X/>
          <span>Удалить аккаунт</span>
        </Button>
      </div>
    </div>
  );
};
