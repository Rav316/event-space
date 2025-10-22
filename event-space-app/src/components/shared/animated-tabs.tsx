import React from 'react';
import { cn } from '@/lib/utils.ts';
import type { Tab } from '@/types/tab.ts';
import { motion } from 'framer-motion';

interface Props {
  tabs: Tab[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const AnimatedTabs: React.FC<Props> = ({
  tabs,
  activeIndex,
  setActiveIndex,
}) => {
  return (
    <div className="w-full">
      <div className='relative bg-muted rounded-2xl p-1 flex w-full overflow-hidden'>
        <motion.div
          layoutId='activeTab'
          className='absolute rounded-2xl bg-background shadow-md'
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 40,
          }}
          style={{
            top: 4, // p-1 ≈ 4px
            bottom: 4,
            left: `calc(${activeIndex * 100 / tabs.length}% + 4px)`,
            width: `calc(${100 / tabs.length}% - 8px)`,
          }}
        />
        {tabs.map((tab, i) => (
          <button
            key={tab.text}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'relative z-10 px-5 py-1.5 text-sm font-medium rounded-2xl transition-colors duration-200 flex-1 flex items-center justify-center gap-2 max-[500px]:text-xs',
              i === activeIndex
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}

          >
            {tab.Icon && <tab.Icon className="w-4 h-4 z-10 max-[500px]:hidden" />
            }
            {tab.text}
          </button>
        ))}
      </div>


    </div>
  );
};
