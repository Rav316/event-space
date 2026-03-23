import React from 'react';

interface Props {
  label: string;
  value: string;
}

export const MyEventsStatisticBlock: React.FC<Props> = ({ label, value }) => {
  return (
    <div
      className={
        'flex flex-col flex-1 border border-[#E8E8E8] rounded-2xl p-4 max-[400px]:p-3'
      }
    >
      <span className={'font-medium text-2xl'}>{value}</span>
      <span className={'text-muted-foreground'}>{label}</span>
    </div>
  );
};
