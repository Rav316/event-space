import React from 'react';

interface Props {
  description: string;
}

export const EventDescription: React.FC<Props> = ({ description }) => {
  return (
    <div className={'flex flex-col gap-3'}>
      <span className={'font-medium text-xl'}>Описание мероприятия</span>
      <p className={'whitespace-pre-line leading-relaxed text-foreground/80'}>
        {description}
      </p>
    </div>
  );
};
