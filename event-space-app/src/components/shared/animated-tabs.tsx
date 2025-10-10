import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils.ts';
import type { Tab } from '@/types/tab.ts';

interface Props {
  tabs: Tab[];
}

export const AnimatedTabs: React.FC<Props> = ({tabs}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderLeft, setSliderLeft] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const buttons = Array.from(container.querySelectorAll('button'));
    const activeButton = buttons[activeIndex];
    if (activeButton) {
      setSliderLeft(activeButton.offsetLeft);
      setSliderWidth(activeButton.offsetWidth);
    }
  }, [activeIndex]);

  return (
    <div className='w-full'>
      <div
        ref={containerRef}
        className='relative bg-muted rounded-2xl p-1 flex w-full overflow-hidden'
      >
        <span
          className='absolute top-1 bottom-1 bg-background rounded-2xl shadow-md transition-all duration-300 ease-out'
          style={{
            left: `${sliderLeft}px`,
            width: `${sliderWidth}px`,
          }}
        />

        {tabs.map((tab, i) => (
          <button
            key={tab.text}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'relative z-10 px-5 py-1.5 text-sm font-medium rounded-2xl transition-colors duration-200 flex-1 flex items-center justify-center gap-2',
              i === activeIndex
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <tab.Icon className='w-4 h-4' />
            <span>{tab.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}