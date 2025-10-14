import React from 'react';
import type { EventStep } from '@/api/events/model.ts';

interface Props {
  steps: EventStep[];
}

export const EventProgram: React.FC<Props> = ({ steps }) => {
  return (
    <div className="rounded-2xl border p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Программа мероприятия</h2>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-6">
            <span className="font-semibold w-16 shrink-0 text-right">
              {step.startTime.slice(0, 5)}
            </span>

            <div className="flex flex-col gap-1">
              <span className="font-medium">{step.name}</span>
              {step.description && (
                <p className="text-gray-600 text-sm leading-snug">
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
