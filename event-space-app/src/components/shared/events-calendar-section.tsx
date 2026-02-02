import * as React from 'react';
import { useState, useMemo } from 'react';
import { useEventsByMonth } from '@/api/events/hooks.ts';
import { Calendar as CalendarIcon, Clock4 } from 'lucide-react';
import { Badge, Calendar } from '@/components/ui';
import { motion } from 'motion/react';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import { Link } from 'react-router';
import { cn } from '@/lib/utils.ts';
import {
  categoryColors,
  categoryHoverBorderColors,
} from '@/constants/category-colors.ts';
import type { EventCalendarDto } from '@/api/events/model.ts';

interface Props {
  className?: string;
}

export const EventsCalendarSection: React.FC<Props> = ({ className }) => {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth() + 1;

  const { data: events } = useEventsByMonth(year, month);

  const eventsByDate = useMemo(() => {
    if (!events) return new Map<string, EventCalendarDto[]>();
    const map = new Map<string, EventCalendarDto[]>();
    for (const event of events) {
      const key = event.eventDate;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(event);
    }
    return map;
  }, [events]);

  const datesWithEvents = useMemo(() => {
    return Array.from(eventsByDate.keys()).map((dateStr) => {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
    });
  }, [eventsByDate]);

  const selectedDateStr = selectedDate
    ? format(selectedDate, 'yyyy-MM-dd')
    : null;

  const selectedEvents = selectedDateStr
    ? eventsByDate.get(selectedDateStr) || []
    : [];

  const formatDateRu = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className={'flex items-center gap-3 mb-5'}>
        <CalendarIcon className={'text-purple-500'} />
        <div className={'flex flex-col gap-y-1'}>
          <span className={'font-medium text-2xl'}>Календарь событий</span>
          <span className={'text-muted-foreground'}>
            Выберите дату, чтобы увидеть запланированные мероприятия
          </span>
        </div>
      </div>

      <div
        className={
          'flex max-[768px]:flex-col gap-6 border border-[#E5E5E5] rounded-2xl p-5'
        }
      >
        <div className={'flex justify-center'}>
          <Calendar
            locale={ru}
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            modifiers={{
              hasEvents: datesWithEvents,
            }}
            modifiersClassNames={{
              hasEvents: 'has-events-dot',
            }}
          />
        </div>

        <div className={'flex-1 min-w-0'}>
          {selectedDate && selectedDateStr ? (
            <div className={'flex flex-col gap-3'}>
              <span className={'font-medium text-lg'}>
                {formatDateRu(selectedDateStr)}
              </span>
              {selectedEvents.length > 0 ? (
                selectedEvents.map((event) => {
                  const categoryColorClass =
                    categoryColors[event.category.id - 1];
                  const categoryHoverBorderClass =
                    categoryHoverBorderColors[event.category.id - 1];

                  return (
                    <Link
                      key={event.id}
                      to={`/events/${event.id}`}
                      className={cn(
                        'flex flex-col gap-1 p-3 rounded-xl border border-[#E5E5E5] transition-all duration-200',
                        categoryHoverBorderClass,
                      )}
                    >
                      <span className={'font-medium truncate'}>
                        {event.name}
                      </span>
                      <div
                        className={
                          'flex items-center gap-3 text-sm text-muted-foreground'
                        }
                      >
                        <div className={'flex items-center gap-1'}>
                          <Clock4 className={'h-3.5 w-3.5'} />
                          <span>
                            {event.startTime.slice(0, 5)} –{' '}
                            {event.endTime.slice(0, 5)}
                          </span>
                        </div>
                        {event.category.name && (
                          <Badge className={categoryColorClass}>
                            {event.category.name}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  );
                })
              ) : (
                <span className={'text-muted-foreground'}>
                  Нет мероприятий в этот день
                </span>
              )}
            </div>
          ) : (
            <div
              className={
                'flex items-center justify-center h-full text-muted-foreground'
              }
            >
              <span>Выберите дату в календаре</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .has-events-dot {
          position: relative;
        }
        .has-events-dot::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #9333ea;
        }
      `}</style>
    </motion.div>
  );
};
