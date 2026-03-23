import React from 'react';
import type { EventStep } from '@/api/events/model.ts';

interface Props {
  steps: EventStep[];
}

export const EventProgram: React.FC<Props> = ({ steps }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Программа мероприятия</h2>
      <div className="flex flex-col gap-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <span className="font-medium text-sm w-12 shrink-0 text-right text-muted-foreground pt-0.5">
              {step.startTime.slice(0, 5)}
            </span>
            <div className="flex flex-col gap-1 flex-1 min-w-0 pl-4 border-l border-[#E8E8E8]">
              <span className="font-medium break-words">{step.name}</span>
              {step.description && (
                <p className="text-muted-foreground text-sm leading-snug break-words">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
