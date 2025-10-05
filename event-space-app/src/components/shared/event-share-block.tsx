import { Button } from '@/components/ui';
import { Download, Share2 } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils.ts';
import { toast } from 'sonner';

interface Props {
  className?: string;
}

export const EventShareBlock: React.FC<Props> = ({ className }) => {
  const handleCopy = () => {
    const textToCopy = window.location.href

    // создаём временный textarea
    const textarea = document.createElement('textarea')
    textarea.value = textToCopy
    document.body.appendChild(textarea)
    textarea.select()
    textarea.setSelectionRange(0, 99999) // для мобильных

    try {
      const successful = document.execCommand('copy')
      if (successful) {
        toast.success('Ссылка скопирована в буфер обмена')
      } else {
        toast.error('Не удалось скопировать ссылку')
      }
    } catch (err) {
      console.error(err)
      toast.error('Произошла ошибка при копировании')
    }

    document.body.removeChild(textarea)
  }


  return (
    <div
      className={cn(
        'flex flex-col gap-4 border border-[#E5E5E5] rounded-2xl p-5',
        className,
      )}
    >
      <span className={'font-medium text-xl'}>Поделиться</span>
      <div className={'flex flex-col gap-2'}>
        <Button variant={'outline'} onClick={handleCopy}>
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
