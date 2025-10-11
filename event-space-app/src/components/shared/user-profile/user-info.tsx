import { Input, Label, Textarea } from '@/components/ui';
import React from 'react';

interface Props {
  editMode?: boolean;
}

export const UserInfo: React.FC<Props> = ({ editMode }) => {
  return (
    <form className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5 border border-[#E5E5E5] rounded-2xl p-5'>
        <h3 className={'font-medium text-xl'}>Основная информация</h3>
        <div className='grid grid-cols-2 gap-5 max-[500px]:grid-cols-1'>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='name'>Имя</Label>
            <Input id='name' placeholder='Введите имя' disabled={!editMode} />
          </div>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='last-name'>Фамилия</Label>
            <Input id='last-name' placeholder='Введите фамилию' disabled={!editMode} />
          </div>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' placeholder='Введите email' disabled={!editMode} />
          </div>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='faculty'>Факультет</Label>
            <Input id='faculty' placeholder='Введите факультет' disabled={!editMode} />
          </div>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='course'>Курс</Label>
            <Input id='course' placeholder='Введите курс' disabled={!editMode} />
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='about'>О себе</Label>
          <Textarea id='about' className='resize-none' placeholder='Расскажите о себе' disabled={!editMode} />
        </div>
      </div>

      <div className='flex flex-col gap-5 border border-[#E5E5E5] rounded-2xl p-5'>
        <span>Социальные сети</span>
        <div className='flex gap-5 max-[600px]:flex-col'>
          <div className='flex flex-col gap-1 flex-1'>
            <Label htmlFor='telegram'>Telegram</Label>
            <Input id='telegram' placeholder='@username' disabled={!editMode} />
          </div>
          <div className='flex flex-col gap-1 flex-1'>
            <Label htmlFor='vkontakte'>VKontakte</Label>
            <Input id='vkontakte' placeholder='vk.com/username' disabled={!editMode} />
          </div>
          <div className='flex flex-col gap-1 flex-1'>
            <Label htmlFor='github'>GitHub</Label>
            <Input id='github' placeholder='github.com/username' disabled={!editMode} />
          </div>
        </div>
      </div>
    </form>
  );
};
