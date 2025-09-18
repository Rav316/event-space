import {useState} from "react";

export const useStepper = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const next = () => {
    setCompletedSteps((prev) => [...prev, currentStep]);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const back = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setCompletedSteps((prev) => prev.filter((step) => step !== currentStep - 1));
  };

  return { currentStep, completedSteps, next, back };
};