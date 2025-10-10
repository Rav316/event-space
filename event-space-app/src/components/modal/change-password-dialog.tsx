import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogTitle,
  DialogTrigger,
  Label, RequiredMark
} from '@/components/ui';
import { Shield } from 'lucide-react';
import { PasswordInput } from '@/components/shared';

export const ChangePasswordDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'outline'} className={'w-full justify-start'}>
          <Shield />
          <span>Изменить пароль</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Изменить пароль</DialogTitle>
        <DialogDescription>
          Введите текущий пароль и новый пароль для вашей учётней записи
          <form className={'flex flex-col gap-4 mt-4'}>
            <div className={'flex flex-col gap-2'}>
              <Label className={'text-black'} htmlFor={'current-password'}>
                Текущий пароль
                <RequiredMark/>
              </Label>
              <PasswordInput placeholder={'Введите текущий пароль'} id={'current-password'} />
            </div>
            <div className={'flex flex-col gap-2'}>
              <Label aria-placeholder={'Введите новый пароль'} className={'text-black'} htmlFor={'current-password'}>
                Новый пароль
                <RequiredMark/>
              </Label>
              <PasswordInput placeholder={'Введите новый пароль'} id={'current-password'} type={'password'} />
            </div>
            <div className={'flex flex-col gap-2'}>
              <Label className={'text-black'} htmlFor={'confirm-password'}>
                Подтвердите новый пароль
                <RequiredMark/>
              </Label>
              <PasswordInput placeholder={'Подтвердите новый пароль'} id={'confirm-password'} type={'password'} />
            </div>
          </form>
        </DialogDescription>
        <DialogFooter>
          <Button variant={'outline'}>
            Отмена
          </Button>
          <Button>Изменить пароль</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
