import { CheckCircle } from 'lucide-react';

type Step = {
  number: number;
  title: string;
  description: string;
};

interface StepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export const Stepper = ({ steps, currentStep, completedSteps }: StepperProps) => {

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                currentStep >= step.number
                  ? "bg-primary text-primary-foreground"
                  : completedSteps.includes(step.number)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {completedSteps.includes(step.number) ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                step.number
              )}
            </div>
            <div className="text-center mt-2">
              <p className="text-xs font-medium">{step.title}</p>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {step.description}
              </p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-px w-16 mx-4 transition-all ${
                currentStep > step.number || completedSteps.includes(step.number)
                  ? "bg-primary"
                  : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};