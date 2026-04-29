import * as React from 'react';
import { useRecommendedEvents } from '@/api/events/hooks.ts';
import { EventGroup } from '@/components/shared/event';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  className?: string;
}

export const RecommendedEventsSection: React.FC<Props> = ({ className }) => {
  const { data, isLoading } = useRecommendedEvents();

  if (!isLoading && (!data || data.length === 0)) {
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
        <Sparkles className={'text-violet-500'} />
        <div className={'flex flex-col gap-y-1'}>
          <span className={'font-medium text-2xl'}>Рекомендовано для вас</span>
          <span className={'text-muted-foreground'}>
            Мероприятия по вашему направлению
          </span>
        </div>
      </div>
      <EventGroup isLoading={isLoading} events={data || []} />
    </motion.div>
  );
};
