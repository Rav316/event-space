import React from 'react';
import { Switch } from '@/components/ui';

interface Props {
  title: string;
  description: string;
  editMode?: boolean;
  value?: boolean;
  onChange: (value: boolean) => void;
}

export const ProfileSetting: React.FC<Props> = ({
  title,
  description,
  editMode,
  value,
  onChange,
}) => {
  return (
    <div className="flex justify-between items-center gap-5">
      <div className="flex flex-col gap-0.5">
        <span className="font-medium">{title}</span>
        <span className="text-muted-foreground">{description}</span>
      </div>

      <Switch checked={value} onCheckedChange={onChange} disabled={!editMode} />
    </div>
  );
};
