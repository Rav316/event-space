import {useState} from "react";
import { useNavigate } from 'react-router';

export const useStepper = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const navigate = useNavigate();

  const next = () => {
    setCompletedSteps((prev) => [...prev, currentStep]);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const back = () => {
    if (currentStep === 1) {
      navigate('/');
      return;
    }
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setCompletedSteps((prev) => prev.filter((step) => step !== currentStep - 1));
  };

  return { currentStep, completedSteps, next, back };
};