import * as React from 'react';
import { usePopularEvents } from '@/api/events/hooks.ts';
import { EventGroup } from '@/components/shared/event';
import { Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  className?: string;
}

export const PopularEventsSection: React.FC<Props> = ({ className }) => {
  const { data, isPending } = usePopularEvents();

  if (!isPending && (!data || data.length === 0)) {
    return null;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className={'flex items-center gap-3 mb-5'}>
        <Flame className={'text-orange-500'} />
        <div className={'flex flex-col gap-y-1'}>
          <span className={'font-medium text-2xl'}>
            Популярные мероприятия
          </span>
          <span className={'text-muted-foreground'}>
            События с наибольшим числом регистраций
          </span>
        </div>
      </div>
      <EventGroup isLoading={isPending} events={data || []} />
    </motion.div>
  );
};
