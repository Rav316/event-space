import React from 'react';

interface Props {
  description: string;
}

export const EventDescription: React.FC<Props> = ({ description }) => {
  return (
    <div
      className={'border border-[#E5E5E5] rounded-2xl p-5 flex flex-col gap-4'}
    >
      <span className={'font-medium text-xl'}>Описание мероприятия</span>
      <p className={'whitespace-pre-line'}>{description}</p>
    </div>
  );
};
