import { Button } from '@/components/ui';
import { Download, Share2 } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils.ts';

interface Props {
  className?: string;
}

export const EventShareBlock: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5',
        className,
      )}
    >
      <span className={'font-medium text-xl'}>Поделиться</span>
      <div className={'flex flex-col gap-2'}>
        <Button variant={'outline'}>
          <Share2 />
          <span>Скопировать ссылку</span>
        </Button>
        <Button variant={'outline'}>
          <Download />
          <span>Добавить в календарь</span>
        </Button>
      </div>
    </div>
  );
};
