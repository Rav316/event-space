import { CheckCircle } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils.ts';

type Step = {
  number: number;
  title: string;
  description: string;
};

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export const RegistrationStepper = ({
  steps,
  currentStep
}: StepperProps) => {
  return (
    <div className="flex justify-center mb-8 w-full">
      <div className="flex items-center w-full justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  currentStep >= step.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <div className="text-center mt-2">
                <p className="text-xs font-medium whitespace-nowrap">
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-px mx-1 sm:mx-2 transition-all',
                  currentStep > step.number
                    ? 'bg-primary'
                    : 'bg-border',
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
