import { Button } from '@/components/ui';
import { Download, Share2 } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils.ts';
import { toast } from 'sonner';

interface Props {
  className?: string;
  eventName: string;
  eventDescription?: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
}

function formatIcsDate(date: string, time: string): string {
  const d = date.replace(/-/g, '');
  const t = time.replace(/:/g, '').slice(0, 6);
  return `${d}T${t}`;
}

function generateIcsFile(props: {
  name: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}) {
  const dtStart = formatIcsDate(props.date, props.startTime);
  const dtEnd = formatIcsDate(props.date, props.endTime);
  const now = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
  const uid = `${Date.now()}@eventspace`;
  const description = (props.description || '').replace(/\n/g, '\\n');

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Event Space//Event//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `DTSTAMP:${now}`,
    `UID:${uid}`,
    `SUMMARY:${props.name}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${props.location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${props.name}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const EventShareBlock: React.FC<Props> = ({
  className,
  eventName,
  eventDescription,
  eventDate,
  startTime,
  endTime,
  location,
}) => {
  const handleCopy = () => {
    const textToCopy = window.location.href;

    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 99999);

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        toast.success('Ссылка скопирована в буфер обмена');
      } else {
        toast.error('Не удалось скопировать ссылку');
      }
    } catch (err) {
      console.error(err);
      toast.error('Произошла ошибка при копировании');
    }

    document.body.removeChild(textarea);
  };

  const handleCalendarExport = () => {
    generateIcsFile({
      name: eventName,
      description: eventDescription,
      date: eventDate,
      startTime,
      endTime,
      location,
    });
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-4 border border-[#E8E8E8] rounded-2xl p-5',
        className,
      )}
    >
      <span className={'font-medium text-xl'}>Поделиться</span>
      <div className={'flex flex-col gap-2'}>
        <Button variant={'outline'} onClick={handleCopy}>
          <Share2 />
          <span>Скопировать ссылку</span>
        </Button>
        <Button variant={'outline'} onClick={handleCalendarExport}>
          <Download />
          <span>Добавить в календарь</span>
        </Button>
      </div>
    </div>
  );
};
