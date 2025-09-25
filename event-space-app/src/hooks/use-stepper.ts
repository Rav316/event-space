import {useState} from "react";

export const useStepper = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const back = () => {
    if (currentStep === 0) {
      return;
    }
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return { currentStep, next, back };
};