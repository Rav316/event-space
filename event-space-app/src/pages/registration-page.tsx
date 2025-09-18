import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stepper,
} from '@/components/ui';
import { ArrowLeft, ArrowRight, Calendar, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import {
  StepPersonalData,
  StepRoleStatus,
  StepSecurity,
} from '@/components/shared/registration';
import { useForm } from 'react-hook-form';
import {
  type PersonalInfoData,
  personalInfoSchema,
} from '@/schemas/personal-info-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSteps } from '@/constants/registration-steps.ts';
import { useRegistrationStore } from '@/store/use-registration-store.ts';
import {
  type RoleStatusData,
  roleStatusSchema,
} from '@/schemas/role-status-schema.ts';
import {
  type PasswordCreateData,
  passwordCreateSchema,
} from '@/schemas/password-create-schema.ts';
import { toast } from 'sonner';

const RegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const navigate = useNavigate();

  const registrationData = useRegistrationStore(
    (state) => state.registrationData,
  );
  const setRegistrationData = useRegistrationStore(
    (state) => state.setRegistrationData,
  );
  const resetRegistrationData = useRegistrationStore(
    (state) => state.resetRegistrationData,
  );

  const personalDataForm = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
      email: registrationData.email,
    },
  });

  const roleStatusForm = useForm<RoleStatusData>({
    resolver: zodResolver(roleStatusSchema),
    defaultValues: {
      role: registrationData.role,
      faculty: registrationData.faculty,
      course: registrationData.course,
    },
  });

  const passwordCreateForm = useForm<PasswordCreateData>({
    resolver: zodResolver(passwordCreateSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepPersonalData form={personalDataForm} />;
      case 2:
        return <StepRoleStatus form={roleStatusForm} />;
      case 3:
        return <StepSecurity form={passwordCreateForm} />;
      default:
        return null;
    }
  };

  const onStepNext = () => {
    switch (currentStep) {
      case 1:
        setRegistrationData(personalDataForm.getValues());
        break;
      case 2:
        setRegistrationData(roleStatusForm.getValues());
        break;
      case 3:
        setRegistrationData(passwordCreateForm.getValues());
        navigate('/');
        toast.success('Вы успешно зарегистрировались');
        resetRegistrationData();
        break;
    }
    setCompletedSteps([...completedSteps, currentStep]);
    setCurrentStep((prev) => prev + 1);
  };

  const onStepBack = () => {
    if (currentStep === 1) return;
    setCurrentStep((prev) => prev - 1);
    setCompletedSteps((prev) =>
      prev.filter((step) => step !== currentStep - 1),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-primary"
          >
            <Calendar className="h-8 w-8" />
            <span className="text-2xl font-bold">EventSpace</span>
          </Link>
          <p className="text-muted-foreground mt-2">
            Присоединяйтесь к нашему сообществу
          </p>
        </div>

        <Stepper
          steps={registrationSteps}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />

        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center space-x-2">
              <Badge variant="outline" className="px-3 py-1">
                Шаг {currentStep} из 3
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-8">
            {renderStepContent()}
            <div className="flex justify-between pt-6 mt-6 border-t border-border/50">
              <Button
                variant="outline"
                className="flex items-center space-x-2"
                onClick={onStepBack}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Назад</span>
              </Button>
              {currentStep === 1 ? (
                <Button onClick={personalDataForm.handleSubmit(onStepNext)}>
                  <span>Далее</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : currentStep === 2 ? (
                <Button onClick={roleStatusForm.handleSubmit(onStepNext)}>
                  <span>Далее</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  className="flex items-center space-x-2"
                  onClick={passwordCreateForm.handleSubmit(onStepNext)}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Создать аккаунт</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
