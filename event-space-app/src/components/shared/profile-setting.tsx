import React from 'react';
import { Switch } from '@/components/ui';

interface Props {
  title: string;
  description: string
}

export const ProfileSetting: React.FC<Props> = ({title, description}) => {
  return (
    <div className={'flex justify-between items-center gap-5'}>
      <div className={'flex flex-col gap-0.5'}>
        <span className={'font-medium'}>{title}</span>
        <span className={'text-muted-foreground'}>{description}</span>
      </div>
      <Switch/>
    </div>
  )
}