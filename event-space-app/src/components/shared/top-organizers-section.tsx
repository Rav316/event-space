import * as React from 'react';
import { useTopOrganizers } from '@/api/users/hooks.ts';
import { OrganizerCard } from '@/components/shared/organizer-card.tsx';
import { Trophy } from 'lucide-react';
import { Skeleton } from '@/components/ui';
import { motion } from 'motion/react';

interface Props {
  className?: string;
}

export const TopOrganizersSection: React.FC<Props> = ({ className }) => {
  const { data, isPending } = useTopOrganizers();

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
        <Trophy className={'text-yellow-500'} />
        <div className={'flex flex-col gap-y-1'}>
          <span className={'font-medium text-2xl'}>Топ организаторов</span>
          <span className={'text-muted-foreground'}>
            Самые активные организаторы мероприятий
          </span>
        </div>
      </div>
      <div
        className={
          'grid grid-cols-3 max-[900px]:grid-cols-2 max-[528px]:grid-cols-1 gap-6'
        }
      >
        {isPending
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[90px] rounded-2xl" />
            ))
          : data?.map((organizer) => (
              <OrganizerCard key={organizer.id} organizer={organizer} />
            ))}
      </div>
    </motion.div>
  );
};
