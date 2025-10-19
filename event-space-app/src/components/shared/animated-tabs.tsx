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
      <div className="relative bg-muted rounded-2xl p-1 flex w-full overflow-hidden">
        {tabs.map((tab, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={tab.text}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'relative z-10 px-5 py-1.5 text-sm font-medium rounded-2xl transition-colors duration-200 flex-1 flex items-center justify-center gap-2 max-[500px]:text-xs',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 bg-background rounded-2xl shadow-md"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 40,
                  }}
                />
              )}
              <tab.Icon className="w-4 h-4 z-10 max-[500px]:hidden" />
              <span className="relative z-10">{tab.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
